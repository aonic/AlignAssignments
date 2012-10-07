/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module) {
    "use strict";
    var COMMAND_ID = "AlignAssignments.align";
    var MENU_NAME = "Align Assignments";
    
    // Brackets modules
    var EditorManager       = brackets.getModule("editor/EditorManager"),
        CommandManager      = brackets.getModule("command/CommandManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager"),
        Menus               = brackets.getModule("command/Menus");
    
    // Local vars
    var Editor = EditorManager.getFocusedEditor(),
        cm     = Editor._codeMirror;

    function multiplySpaces(count){
        return new Array(count + 1).join(" ")
    }
    
    function getEqPos(string){
        return string.replace(/==/g, '##').indexOf("=");
    }
  
    function getFurthest(fromLine, toLine){
        var line               = cm.getLine(fromLine),
            furthest           = getEqPos(line);
        
        for(var currLine       = fromLine + 1; currLine <= toLine; currLine++){
            line               = cm.getLine(currLine);
            if(furthest < getEqPos(line))
                furthest       = getEqPos(line);
        }
        
        return furthest;
    }
    
    
    function fixLines(fromLine, toLine, charPos){
        var line,
            pos;
        for(var currLine = fromLine; currLine <= toLine; currLine++){
            line = cm.getLine(currLine);
            pos  = getEqPos(line);

            if(pos < charPos && pos !== -1)
                cm.replaceRange(multiplySpaces(charPos - pos), {line: currLine, ch: pos});
        }
    }
    
    function align(){
        Editor = EditorManager.getFocusedEditor();
        cm     = Editor._codeMirror;
        
        var fromLine = Editor.getSelection().start.line,
            toLine   = Editor.getSelection().end.line,
            charPos  = getFurthest(fromLine, toLine);

        fixLines(fromLine, toLine, charPos);
    }
    
    CommandManager.register("Align Assignments", COMMAND_ID, align);
    KeyBindingManager.addBinding(COMMAND_ID, "Ctrl-Shift-A");
    
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID);
});
