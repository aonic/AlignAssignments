AlignAssignments
================

A brackets extension that aligns assignments(Equal signs). To install, place in ```brackets/src/extensions/user``` folder.
Currently it only works with spaces not tabs.

Usage
=====
**Ctrl-Shift-A** when selected multiple lines with asignments.




```
    var EditorManager   = brackets.getModule("editor/EditorManager"),
        CommandManager        = brackets.getModule("command/CommandManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager");

```

becomes:
```
    var EditorManager       = brackets.getModule("editor/EditorManager"),
        CommandManager      = brackets.getModule("command/CommandManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager");

```
