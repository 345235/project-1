from __future__ import annotations

import os
import shutil
import stat
import subprocess
import sys
import tkinter as tk
from dataclasses import dataclass
from pathlib import Path
from tkinter import filedialog, messagebox, simpledialog, ttk
from typing import Optional


@dataclass
class ClipboardItem:
    path: Path
    operation: str  # copy | cut


class FileExplorerApp:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("Python File Explorer")
        self.root.geometry("1200x700")
        self.root.minsize(900, 550)

        self.current_path = Path.home()
        self.clipboard_item: Optional[ClipboardItem] = None
        self.history: list[Path] = [self.current_path]
        self.history_index = 0
        self.icon_cache: dict[str, str] = {}

        self._build_ui()
        self._bind_shortcuts()
        self.load_directory(self.current_path, add_to_history=False)

    def _build_ui(self) -> None:
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(1, weight=1)

        self._build_toolbar()
        self._build_main_area()
        self._build_statusbar()
        self._build_context_menu()

    def _build_toolbar(self) -> None:
        toolbar = ttk.Frame(self.root, padding=(8, 8, 8, 4))
        toolbar.grid(row=0, column=0, sticky="ew")
        toolbar.columnconfigure(7, weight=1)

        ttk.Button(toolbar, text="← Back", command=self.go_back).grid(
            row=0, column=0, padx=2
        )
        ttk.Button(toolbar, text="Forward →", command=self.go_forward).grid(
            row=0, column=1, padx=2
        )
        ttk.Button(toolbar, text="↑ Up", command=self.go_up).grid(
            row=0, column=2, padx=2
        )
        ttk.Button(toolbar, text="Refresh", command=self.refresh).grid(
            row=0, column=3, padx=2
        )
        ttk.Button(
            toolbar, text="Home", command=lambda: self.load_directory(Path.home())
        ).grid(row=0, column=4, padx=2)
        ttk.Button(toolbar, text="Open Folder", command=self.choose_directory).grid(
            row=0, column=5, padx=2
        )

        self.search_var = tk.StringVar()
        self.search_var.trace_add("write", lambda *_: self.filter_items())

        ttk.Label(toolbar, text="Path:").grid(row=0, column=6, padx=(12, 4))
        self.path_var = tk.StringVar()
        self.path_entry = ttk.Entry(toolbar, textvariable=self.path_var)
        self.path_entry.grid(row=0, column=7, sticky="ew", padx=2)
        self.path_entry.bind("<Return>", lambda event: self.open_entered_path())

        ttk.Label(toolbar, text="Search:").grid(row=0, column=8, padx=(12, 4))
        self.search_entry = ttk.Entry(toolbar, textvariable=self.search_var, width=24)
        self.search_entry.grid(row=0, column=9, padx=2)

    def _build_main_area(self) -> None:
        main = ttk.PanedWindow(self.root, orient=tk.HORIZONTAL)
        main.grid(row=1, column=0, sticky="nsew", padx=8, pady=4)

        left_frame = ttk.Frame(main, padding=(0, 0, 8, 0))
        left_frame.columnconfigure(0, weight=1)
        left_frame.rowconfigure(0, weight=1)

        self.tree = ttk.Treeview(left_frame, show="tree")
        self.tree.grid(row=0, column=0, sticky="nsew")
        tree_scroll = ttk.Scrollbar(
            left_frame, orient="vertical", command=self.tree.yview
        )
        tree_scroll.grid(row=0, column=1, sticky="ns")
        self.tree.configure(yscrollcommand=tree_scroll.set)

        self.tree.bind("<<TreeviewOpen>>", self.on_tree_expand)
        self.tree.bind("<<TreeviewSelect>>", self.on_tree_select)

        right_frame = ttk.Frame(main)
        right_frame.columnconfigure(0, weight=1)
        right_frame.rowconfigure(0, weight=1)

        columns = ("name", "type", "size", "modified")
        self.file_list = ttk.Treeview(right_frame, columns=columns, show="headings")
        self.file_list.heading(
            "name", text="Name", command=lambda: self.sort_list("name", False)
        )
        self.file_list.heading(
            "type", text="Type", command=lambda: self.sort_list("type", False)
        )
        self.file_list.heading(
            "size", text="Size", command=lambda: self.sort_list("size", True)
        )
        self.file_list.heading(
            "modified",
            text="Modified",
            command=lambda: self.sort_list("modified", True),
        )

        self.file_list.column("name", width=420, anchor="w")
        self.file_list.column("type", width=120, anchor="w")
        self.file_list.column("size", width=110, anchor="e")
        self.file_list.column("modified", width=180, anchor="w")

        self.file_list.grid(row=0, column=0, sticky="nsew")
        list_scroll_y = ttk.Scrollbar(
            right_frame, orient="vertical", command=self.file_list.yview
        )
        list_scroll_y.grid(row=0, column=1, sticky="ns")
        list_scroll_x = ttk.Scrollbar(
            right_frame, orient="horizontal", command=self.file_list.xview
        )
        list_scroll_x.grid(row=1, column=0, sticky="ew")
        self.file_list.configure(
            yscrollcommand=list_scroll_y.set, xscrollcommand=list_scroll_x.set
        )

        self.file_list.bind("<Double-1>", self.on_item_open)
        self.file_list.bind("<Return>", self.on_item_open)
        self.file_list.bind("<Button-3>", self.show_context_menu)

        main.add(left_frame, weight=1)
        main.add(right_frame, weight=4)

        self._populate_root_tree()

    def _build_statusbar(self) -> None:
        status = ttk.Frame(self.root, padding=(8, 4))
        status.grid(row=2, column=0, sticky="ew")
        status.columnconfigure(0, weight=1)

        self.status_var = tk.StringVar(value="Ready")
        ttk.Label(status, textvariable=self.status_var, anchor="w").grid(
            row=0, column=0, sticky="ew"
        )

    def _build_context_menu(self) -> None:
        self.context_menu = tk.Menu(self.root, tearoff=False)
        self.context_menu.add_command(label="Open", command=self.open_selected)
        self.context_menu.add_command(
            label="Open in System", command=self.open_selected_in_system
        )
        self.context_menu.add_separator()
        self.context_menu.add_command(label="New Folder", command=self.create_folder)
        self.context_menu.add_command(label="Rename", command=self.rename_selected)
        self.context_menu.add_command(label="Delete", command=self.delete_selected)
        self.context_menu.add_separator()
        self.context_menu.add_command(label="Copy", command=self.copy_selected)
        self.context_menu.add_command(label="Cut", command=self.cut_selected)
        self.context_menu.add_command(label="Paste", command=self.paste_into_current)

    def _bind_shortcuts(self) -> None:
        self.root.bind("<F5>", lambda event: self.refresh())
        self.root.bind("<Control-c>", lambda event: self.copy_selected())
        self.root.bind("<Control-x>", lambda event: self.cut_selected())
        self.root.bind("<Control-v>", lambda event: self.paste_into_current())
        self.root.bind("<Delete>", lambda event: self.delete_selected())
        self.root.bind("<Control-r>", lambda event: self.rename_selected())
        self.root.bind("<Alt-Left>", lambda event: self.go_back())
        self.root.bind("<Alt-Right>", lambda event: self.go_forward())
        self.root.bind("<Alt-Up>", lambda event: self.go_up())

    def _populate_root_tree(self) -> None:
        self.tree.delete(*self.tree.get_children())
        if os.name == "nt":
            for drive in self._windows_drives():
                node = self.tree.insert("", "end", text=drive, values=(drive,))
                self.tree.insert(node, "end", text="...")
        else:
            node = self.tree.insert("", "end", text="/", values=("/",))
            self.tree.insert(node, "end", text="...")

    def _windows_drives(self) -> list[str]:
        drives = []
        for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
            drive = f"{letter}:\\"
            if os.path.exists(drive):
                drives.append(drive)
        return drives

    def on_tree_expand(self, event: tk.Event) -> None:
        node = self.tree.focus()
        values = self.tree.item(node, "values")
        if not values:
            return
        path = Path(values[0])
        self._expand_tree_node(node, path)

    def _expand_tree_node(self, node: str, path: Path) -> None:
        children = self.tree.get_children(node)
        for child in children:
            if self.tree.item(child, "text") == "...":
                self.tree.delete(child)

        try:
            directories = sorted(
                (p for p in path.iterdir() if p.is_dir()), key=lambda p: p.name.lower()
            )
        except (PermissionError, FileNotFoundError, OSError):
            return

        existing = {
            self.tree.item(child, "text") for child in self.tree.get_children(node)
        }
        for directory in directories:
            if directory.name in existing:
                continue
            child = self.tree.insert(
                node, "end", text=directory.name, values=(str(directory),)
            )
            if self._has_subdirectories(directory):
                self.tree.insert(child, "end", text="...")

    def _has_subdirectories(self, path: Path) -> bool:
        try:
            return any(item.is_dir() for item in path.iterdir())
        except (PermissionError, FileNotFoundError, OSError):
            return False

    def on_tree_select(self, event: tk.Event) -> None:
        node = self.tree.focus()
        values = self.tree.item(node, "values")
        if values:
            self.load_directory(Path(values[0]))

    def choose_directory(self) -> None:
        folder = filedialog.askdirectory(initialdir=str(self.current_path))
        if folder:
            self.load_directory(Path(folder))

    def open_entered_path(self) -> None:
        path = Path(self.path_var.get().strip())
        if path.exists() and path.is_dir():
            self.load_directory(path)
        else:
            messagebox.showerror(
                "Invalid path", "Please enter an existing folder path."
            )

    def load_directory(self, path: Path, add_to_history: bool = True) -> None:
        try:
            path = path.resolve()
        except OSError:
            pass

        if not path.exists() or not path.is_dir():
            messagebox.showerror("Folder not found", f"Cannot open folder:\n{path}")
            return

        self.current_path = path
        self.path_var.set(str(path))
        self.root.title(f"Python File Explorer - {path}")

        if add_to_history:
            if self.history_index < len(self.history) - 1:
                self.history = self.history[: self.history_index + 1]
            self.history.append(path)
            self.history_index = len(self.history) - 1

        self.refresh(select_in_tree=True)

    def refresh(self, select_in_tree: bool = False) -> None:
        self.file_list.delete(*self.file_list.get_children())

        try:
            items = list(self.current_path.iterdir())
        except PermissionError:
            messagebox.showerror(
                "Permission denied", f"Cannot access:\n{self.current_path}"
            )
            return
        except FileNotFoundError:
            messagebox.showerror(
                "Not found", f"Folder no longer exists:\n{self.current_path}"
            )
            return

        directories = sorted(
            (item for item in items if item.is_dir()), key=lambda p: p.name.lower()
        )
        files = sorted(
            (item for item in items if item.is_file()), key=lambda p: p.name.lower()
        )

        for item in directories + files:
            self._insert_item(item)

        self.filter_items()
        if select_in_tree:
            self.select_tree_path(self.current_path)
        self.status_var.set(f"{len(items)} items in {self.current_path}")

    def _insert_item(self, path: Path) -> None:
        item_type = (
            "Folder"
            if path.is_dir()
            else path.suffix.lower().replace(".", "").upper() or "File"
        )
        size = "" if path.is_dir() else self._format_size(path.stat().st_size)
        modified = self._format_mtime(path)
        self.file_list.insert(
            "", "end", values=(path.name, item_type, size, modified), tags=(str(path),)
        )

    def _format_size(self, size: int) -> str:
        units = ["B", "KB", "MB", "GB", "TB"]
        value = float(size)
        for unit in units:
            if value < 1024 or unit == units[-1]:
                return f"{value:.0f} {unit}" if unit == "B" else f"{value:.1f} {unit}"
            value /= 1024
        return f"{size} B"

    def _format_mtime(self, path: Path) -> str:
        try:
            import datetime as dt

            return dt.datetime.fromtimestamp(path.stat().st_mtime).strftime(
                "%Y-%m-%d %H:%M"
            )
        except OSError:
            return "Unknown"

    def filter_items(self) -> None:
        query = self.search_var.get().strip().lower()
        visible_count = 0
        for item_id in self.file_list.get_children():
            values = self.file_list.item(item_id, "values")
            name = str(values[0]).lower() if values else ""
            matches = not query or query in name
            if matches:
                self.file_list.reattach(item_id, "", "end")
                visible_count += 1
            else:
                self.file_list.detach(item_id)
        self.status_var.set(f"Showing {visible_count} items in {self.current_path}")

    def sort_list(self, column: str, numeric_like: bool) -> None:
        column_index = {"name": 0, "type": 1, "size": 2, "modified": 3}[column]
        items = []
        for item_id in self.file_list.get_children(""):
            values = self.file_list.item(item_id, "values")
            items.append((values[column_index], item_id, values))

        def key_func(entry: tuple[str, str, tuple]) -> object:
            value = entry[0]
            if numeric_like and column == "size":
                return self._parse_size(str(value))
            return str(value).lower()

        for index, (_, item_id, _) in enumerate(sorted(items, key=key_func)):
            self.file_list.move(item_id, "", index)

    def _parse_size(self, value: str) -> int:
        if not value:
            return -1
        parts = value.split()
        if len(parts) != 2:
            return 0
        number, unit = parts
        factor = {"B": 1, "KB": 1024, "MB": 1024**2, "GB": 1024**3, "TB": 1024**4}.get(
            unit, 1
        )
        return int(float(number) * factor)

    def get_selected_path(self) -> Optional[Path]:
        selected = self.file_list.selection()
        if not selected:
            return None
        tags = self.file_list.item(selected[0], "tags")
        return Path(tags[0]) if tags else None

    def on_item_open(self, event: Optional[tk.Event] = None) -> None:
        self.open_selected()

    def open_selected(self) -> None:
        path = self.get_selected_path()
        if not path:
            return
        if path.is_dir():
            self.load_directory(path)
        else:
            self.open_in_default_app(path)

    def open_selected_in_system(self) -> None:
        path = self.get_selected_path()
        if path:
            self.open_in_default_app(path)

    def open_in_default_app(self, path: Path) -> None:
        try:
            if sys.platform.startswith("win"):
                os.startfile(path)  # type: ignore[attr-defined]
            elif sys.platform == "darwin":
                subprocess.run(["open", str(path)], check=False)
            else:
                subprocess.run(["xdg-open", str(path)], check=False)
        except Exception as exc:
            messagebox.showerror("Open failed", f"Could not open:\n{path}\n\n{exc}")

    def create_folder(self) -> None:
        name = simpledialog.askstring("New folder", "Folder name:", parent=self.root)
        if not name:
            return
        target = self.current_path / name
        try:
            target.mkdir(parents=False, exist_ok=False)
            self.refresh(select_in_tree=True)
        except FileExistsError:
            messagebox.showerror(
                "Exists", "A file or folder with that name already exists."
            )
        except OSError as exc:
            messagebox.showerror("Create failed", str(exc))

    def rename_selected(self) -> None:
        path = self.get_selected_path()
        if not path:
            return
        new_name = simpledialog.askstring(
            "Rename", "New name:", initialvalue=path.name, parent=self.root
        )
        if not new_name or new_name == path.name:
            return
        target = path.with_name(new_name)
        try:
            path.rename(target)
            self.refresh(select_in_tree=True)
        except OSError as exc:
            messagebox.showerror("Rename failed", str(exc))

    def delete_selected(self) -> None:
        path = self.get_selected_path()
        if not path:
            return
        confirmed = messagebox.askyesno("Delete", f"Delete this item?\n\n{path}")
        if not confirmed:
            return
        try:
            if path.is_dir():
                shutil.rmtree(path, onerror=self._handle_remove_readonly)
            else:
                path.unlink()
            self.refresh(select_in_tree=True)
        except OSError as exc:
            messagebox.showerror("Delete failed", str(exc))

    def _handle_remove_readonly(self, func, path, _exc) -> None:
        os.chmod(path, stat.S_IWRITE)
        func(path)

    def copy_selected(self) -> None:
        path = self.get_selected_path()
        if path:
            self.clipboard_item = ClipboardItem(path=path, operation="copy")
            self.status_var.set(f"Copied {path.name}")

    def cut_selected(self) -> None:
        path = self.get_selected_path()
        if path:
            self.clipboard_item = ClipboardItem(path=path, operation="cut")
            self.status_var.set(f"Cut {path.name}")

    def paste_into_current(self) -> None:
        if not self.clipboard_item:
            return
        source = self.clipboard_item.path
        destination = self.current_path / source.name
        try:
            if destination.exists():
                raise FileExistsError(f"Destination already exists:\n{destination}")
            if self.clipboard_item.operation == "copy":
                if source.is_dir():
                    shutil.copytree(source, destination)
                else:
                    shutil.copy2(source, destination)
            else:
                shutil.move(str(source), str(destination))
                self.clipboard_item = None
            self.refresh(select_in_tree=True)
        except OSError as exc:
            messagebox.showerror("Paste failed", str(exc))

    def go_back(self) -> None:
        if self.history_index > 0:
            self.history_index -= 1
            self.load_directory(self.history[self.history_index], add_to_history=False)

    def go_forward(self) -> None:
        if self.history_index < len(self.history) - 1:
            self.history_index += 1
            self.load_directory(self.history[self.history_index], add_to_history=False)

    def go_up(self) -> None:
        parent = self.current_path.parent
        if parent != self.current_path:
            self.load_directory(parent)

    def select_tree_path(self, path: Path) -> None:
        path_str = str(path)
        for node in self.tree.get_children(""):
            if self._select_tree_path_recursive(node, path_str):
                return

    def _select_tree_path_recursive(self, node: str, target: str) -> bool:
        values = self.tree.item(node, "values")
        if values and values[0] == target:
            self.tree.selection_set(node)
            self.tree.focus(node)
            self.tree.see(node)
            return True

        node_path = Path(values[0]) if values else None
        if node_path and Path(target).is_relative_to(node_path):
            self._expand_tree_node(node, node_path)
            for child in self.tree.get_children(node):
                if self._select_tree_path_recursive(child, target):
                    return True
        return False

    def show_context_menu(self, event: tk.Event) -> None:
        row_id = self.file_list.identify_row(event.y)
        if row_id:
            self.file_list.selection_set(row_id)
            self.context_menu.tk_popup(event.x_root, event.y_root)


def main() -> None:
    root = tk.Tk()
    style = ttk.Style(root)
    if "vista" in style.theme_names():
        style.theme_use("vista")
    elif "clam" in style.theme_names():
        style.theme_use("clam")

    app = FileExplorerApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
