/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Open containing folder" menu item 
 * and right click context menu item in sidebar
*/
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        FileUtils      = brackets.getModule("file/FileUtils"),
        ProjectManager = brackets.getModule("project/ProjectManager");

    
    // Function to run when the menu item is clicked
    function handleOpenContainingFolder() {
        var selectedEntry = ProjectManager.getSelectedItem();
        if (!selectedEntry) {
            var doc = DocumentManager.getCurrentDocument();
            selectedEntry = (doc && doc.file);
        }
        
        var path = selectedEntry.fullPath;
        if (selectedEntry.isFile) {
            path = path.substr(0, path.lastIndexOf("/"));
        }
        
        brackets.app.showOSFolder(path, function (err) {
            
        });
    }
    
    
    var CMD_OPEN_CONTAINING = "openfolder.containing";   // package-style naming to avoid collisions
    CommandManager.register("Open Containing Folder", CMD_OPEN_CONTAINING, handleOpenContainingFolder);

    var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.PROJECT_MENU);
    contextMenu.addMenuItem(CMD_OPEN_CONTAINING);

    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(CMD_OPEN_CONTAINING, "Ctrl-Alt-O");
    
    var editor_cmenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    editor_cmenu.addMenuItem(CMD_OPEN_CONTAINING);

});