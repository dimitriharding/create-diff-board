/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 399:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var deselectCurrent = __webpack_require__(742);

var defaultMessage = 'Copy to clipboard: #{key}, Enter';

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + '+C';
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function stripHtml(html)
{
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function createMarkElForText(text) {
  var mark;
  mark = document.createElement('span');
  mark.textContent = text;
  // reset user styles for span element
  mark.style.all = 'unset';
  // prevents scrolling to the end of the page
  mark.style.position = 'fixed';
  mark.style.top = 0;
  mark.style.clip = 'rect(0, 0, 0, 0)';
  // used to preserve spaces and line breaks
  mark.style.whiteSpace = 'pre';
  // do not inherit user-select (it may be `none`)
  mark.style.webkitUserSelect = 'text';
  mark.style.MozUserSelect = 'text';
  mark.style.msUserSelect = 'text';
  mark.style.userSelect = 'text';
  return mark;
}

function createMarkElForHtml(html) {
  var mark;
  mark = document.createElement('div');
  mark.style.fontSize = '12pt'; // Prevent zooming on iOS
  // Reset box model
  mark.style.border = '0';
  mark.style.padding = '0';
  mark.style.margin = '0';
  // Move element out of screen 
  mark.style.position = 'fixed';
  mark.style['right'] = '-9999px';
  mark.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
  // more hiding
  mark.setAttribute('readonly', '');
  mark.style.opacity = 0;
  mark.style.pointerEvents = 'none';
  mark.style.zIndex = -1;
  mark.setAttribute('tabindex', '0'); // so it can be focused
  mark.innerHTML = html;
  return mark;
}

function copy(textOrHtml, options) {
  var debug, message, reselectPrevious, range, selection, mark, success = false;
  if (!options) { options = {}; }
  debug = options.debug || false;
  options.onlyHtml = options.onlyHtml && options.asHtml;
  options.canUsePrompt = options.canUsePrompt != undefined ? options.canUsePrompt : true;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    var html, text;
    if (options.asHtml) {
        html = textOrHtml;
        text = stripHtml(html);
    } else {
        text = textOrHtml;
    }
    mark = options.asHtml ? createMarkElForHtml(html) : createMarkElForText(text);

    document.body.appendChild(mark);

    //range.setStartBefore(mark.firstChild);
    //range.setEndAfter(mark.lastChild);
    range.selectNode(mark);

    selection.removeAllRanges();
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
    success = true;
  } catch (err) {
    debug && console.error('unable to copy using execCommand: ', err);
    if (!options.onlyHtml) {
      debug && console.warn('trying IE specific stuff');
      try {
        //html is not supported in IE
        //https://msdn.microsoft.com/en-us/library/ms536744(v=VS.85).aspx
        window.clipboardData.setData('text', text);
        success = true;
      } catch (err) {
        debug && console.error('unable to copy using clipboardData: ', err);
        if (options.canUsePrompt) {
          debug && console.error('falling back to prompt');
          message = format('message' in options ? options.message : defaultMessage);
          window.prompt(message, text);
        }
      }
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

module.exports = copy;


/***/ }),

/***/ 504:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "defaultDiff2HtmlConfig": () => (/* binding */ defaultDiff2HtmlConfig),
  "html": () => (/* binding */ html),
  "parse": () => (/* binding */ diff2html_parse)
});

;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/types.js
var LineType;
(function (LineType) {
    LineType["INSERT"] = "insert";
    LineType["DELETE"] = "delete";
    LineType["CONTEXT"] = "context";
})(LineType || (LineType = {}));
var OutputFormatType = {
    LINE_BY_LINE: 'line-by-line',
    SIDE_BY_SIDE: 'side-by-side',
};
var LineMatchingType = {
    LINES: 'lines',
    WORDS: 'words',
    NONE: 'none',
};
var DiffStyleType = {
    WORD: 'word',
    CHAR: 'char',
};
//# sourceMappingURL=types.js.map
;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/utils.js
var specials = [
    '-',
    '[',
    ']',
    '/',
    '{',
    '}',
    '(',
    ')',
    '*',
    '+',
    '?',
    '.',
    '\\',
    '^',
    '$',
    '|',
];
var regex = RegExp('[' + specials.join('\\') + ']', 'g');
function escapeForRegExp(str) {
    return str.replace(regex, '\\$&');
}
function unifyPath(path) {
    return path ? path.replace(/\\/g, '/') : path;
}
function hashCode(text) {
    var i, chr, len;
    var hash = 0;
    for (i = 0, len = text.length; i < len; i++) {
        chr = text.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}
//# sourceMappingURL=utils.js.map
;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/diff-parser.js
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};


function getExtension(filename, language) {
    var filenameParts = filename.split('.');
    return filenameParts.length > 1 ? filenameParts[filenameParts.length - 1] : language;
}
function startsWithAny(str, prefixes) {
    return prefixes.reduce(function (startsWith, prefix) { return startsWith || str.startsWith(prefix); }, false);
}
var baseDiffFilenamePrefixes = ['a/', 'b/', 'i/', 'w/', 'c/', 'o/'];
function getFilename(line, linePrefix, extraPrefix) {
    var prefixes = extraPrefix !== undefined ? __spreadArray(__spreadArray([], baseDiffFilenamePrefixes, true), [extraPrefix], false) : baseDiffFilenamePrefixes;
    var FilenameRegExp = linePrefix
        ? new RegExp("^".concat(escapeForRegExp(linePrefix), " \"?(.+?)\"?$"))
        : new RegExp('^"?(.+?)"?$');
    var _a = FilenameRegExp.exec(line) || [], _b = _a[1], filename = _b === void 0 ? '' : _b;
    var matchingPrefix = prefixes.find(function (p) { return filename.indexOf(p) === 0; });
    var fnameWithoutPrefix = matchingPrefix ? filename.slice(matchingPrefix.length) : filename;
    return fnameWithoutPrefix.replace(/\s+\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)? [+-]\d{4}.*$/, '');
}
function getSrcFilename(line, srcPrefix) {
    return getFilename(line, '---', srcPrefix);
}
function getDstFilename(line, dstPrefix) {
    return getFilename(line, '+++', dstPrefix);
}
function parse(diffInput, config) {
    if (config === void 0) { config = {}; }
    var files = [];
    var currentFile = null;
    var currentBlock = null;
    var oldLine = null;
    var oldLine2 = null;
    var newLine = null;
    var possibleOldName = null;
    var possibleNewName = null;
    var oldFileNameHeader = '--- ';
    var newFileNameHeader = '+++ ';
    var hunkHeaderPrefix = '@@';
    var oldMode = /^old mode (\d{6})/;
    var newMode = /^new mode (\d{6})/;
    var deletedFileMode = /^deleted file mode (\d{6})/;
    var newFileMode = /^new file mode (\d{6})/;
    var copyFrom = /^copy from "?(.+)"?/;
    var copyTo = /^copy to "?(.+)"?/;
    var renameFrom = /^rename from "?(.+)"?/;
    var renameTo = /^rename to "?(.+)"?/;
    var similarityIndex = /^similarity index (\d+)%/;
    var dissimilarityIndex = /^dissimilarity index (\d+)%/;
    var index = /^index ([\da-z]+)\.\.([\da-z]+)\s*(\d{6})?/;
    var binaryFiles = /^Binary files (.*) and (.*) differ/;
    var binaryDiff = /^GIT binary patch/;
    var combinedIndex = /^index ([\da-z]+),([\da-z]+)\.\.([\da-z]+)/;
    var combinedMode = /^mode (\d{6}),(\d{6})\.\.(\d{6})/;
    var combinedNewFile = /^new file mode (\d{6})/;
    var combinedDeletedFile = /^deleted file mode (\d{6}),(\d{6})/;
    var diffLines = diffInput
        .replace(/\\ No newline at end of file/g, '')
        .replace(/\r\n?/g, '\n')
        .split('\n');
    function saveBlock() {
        if (currentBlock !== null && currentFile !== null) {
            currentFile.blocks.push(currentBlock);
            currentBlock = null;
        }
    }
    function saveFile() {
        if (currentFile !== null) {
            if (!currentFile.oldName && possibleOldName !== null) {
                currentFile.oldName = possibleOldName;
            }
            if (!currentFile.newName && possibleNewName !== null) {
                currentFile.newName = possibleNewName;
            }
            if (currentFile.newName) {
                files.push(currentFile);
                currentFile = null;
            }
        }
        possibleOldName = null;
        possibleNewName = null;
    }
    function startFile() {
        saveBlock();
        saveFile();
        currentFile = {
            blocks: [],
            deletedLines: 0,
            addedLines: 0,
        };
    }
    function startBlock(line) {
        saveBlock();
        var values;
        if (currentFile !== null) {
            if ((values = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@.*/.exec(line))) {
                currentFile.isCombined = false;
                oldLine = parseInt(values[1], 10);
                newLine = parseInt(values[2], 10);
            }
            else if ((values = /^@@@ -(\d+)(?:,\d+)? -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@@.*/.exec(line))) {
                currentFile.isCombined = true;
                oldLine = parseInt(values[1], 10);
                oldLine2 = parseInt(values[2], 10);
                newLine = parseInt(values[3], 10);
            }
            else {
                if (line.startsWith(hunkHeaderPrefix)) {
                    console.error('Failed to parse lines, starting in 0!');
                }
                oldLine = 0;
                newLine = 0;
                currentFile.isCombined = false;
            }
        }
        currentBlock = {
            lines: [],
            oldStartLine: oldLine,
            oldStartLine2: oldLine2,
            newStartLine: newLine,
            header: line,
        };
    }
    function createLine(line) {
        if (currentFile === null || currentBlock === null || oldLine === null || newLine === null)
            return;
        var currentLine = {
            content: line,
        };
        var addedPrefixes = currentFile.isCombined ? ['+ ', ' +', '++'] : ['+'];
        var deletedPrefixes = currentFile.isCombined ? ['- ', ' -', '--'] : ['-'];
        if (startsWithAny(line, addedPrefixes)) {
            currentFile.addedLines++;
            currentLine.type = LineType.INSERT;
            currentLine.oldNumber = undefined;
            currentLine.newNumber = newLine++;
        }
        else if (startsWithAny(line, deletedPrefixes)) {
            currentFile.deletedLines++;
            currentLine.type = LineType.DELETE;
            currentLine.oldNumber = oldLine++;
            currentLine.newNumber = undefined;
        }
        else {
            currentLine.type = LineType.CONTEXT;
            currentLine.oldNumber = oldLine++;
            currentLine.newNumber = newLine++;
        }
        currentBlock.lines.push(currentLine);
    }
    function existHunkHeader(line, lineIdx) {
        var idx = lineIdx;
        while (idx < diffLines.length - 3) {
            if (line.startsWith('diff')) {
                return false;
            }
            if (diffLines[idx].startsWith(oldFileNameHeader) &&
                diffLines[idx + 1].startsWith(newFileNameHeader) &&
                diffLines[idx + 2].startsWith(hunkHeaderPrefix)) {
                return true;
            }
            idx++;
        }
        return false;
    }
    diffLines.forEach(function (line, lineIndex) {
        if (!line || line.startsWith('*')) {
            return;
        }
        var values;
        var prevLine = diffLines[lineIndex - 1];
        var nxtLine = diffLines[lineIndex + 1];
        var afterNxtLine = diffLines[lineIndex + 2];
        if (line.startsWith('diff')) {
            startFile();
            var gitDiffStart = /^diff --git "?([a-ciow]\/.+)"? "?([a-ciow]\/.+)"?/;
            if ((values = gitDiffStart.exec(line))) {
                possibleOldName = getFilename(values[1], undefined, config.dstPrefix);
                possibleNewName = getFilename(values[2], undefined, config.srcPrefix);
            }
            if (currentFile === null) {
                throw new Error('Where is my file !!!');
            }
            currentFile.isGitDiff = true;
            return;
        }
        if (!currentFile ||
            (!currentFile.isGitDiff &&
                currentFile &&
                line.startsWith(oldFileNameHeader) &&
                nxtLine.startsWith(newFileNameHeader) &&
                afterNxtLine.startsWith(hunkHeaderPrefix))) {
            startFile();
        }
        if (currentFile === null || currentFile === void 0 ? void 0 : currentFile.isTooBig) {
            return;
        }
        if (currentFile &&
            ((typeof config.diffMaxChanges === 'number' &&
                currentFile.addedLines + currentFile.deletedLines > config.diffMaxChanges) ||
                (typeof config.diffMaxLineLength === 'number' && line.length > config.diffMaxLineLength))) {
            currentFile.isTooBig = true;
            currentFile.addedLines = 0;
            currentFile.deletedLines = 0;
            currentFile.blocks = [];
            currentBlock = null;
            var message = typeof config.diffTooBigMessage === 'function'
                ? config.diffTooBigMessage(files.length)
                : 'Diff too big to be displayed';
            startBlock(message);
            return;
        }
        if ((line.startsWith(oldFileNameHeader) && nxtLine.startsWith(newFileNameHeader)) ||
            (line.startsWith(newFileNameHeader) && prevLine.startsWith(oldFileNameHeader))) {
            if (currentFile &&
                !currentFile.oldName &&
                line.startsWith('--- ') &&
                (values = getSrcFilename(line, config.srcPrefix))) {
                currentFile.oldName = values;
                currentFile.language = getExtension(currentFile.oldName, currentFile.language);
                return;
            }
            if (currentFile &&
                !currentFile.newName &&
                line.startsWith('+++ ') &&
                (values = getDstFilename(line, config.dstPrefix))) {
                currentFile.newName = values;
                currentFile.language = getExtension(currentFile.newName, currentFile.language);
                return;
            }
        }
        if (currentFile &&
            (line.startsWith(hunkHeaderPrefix) ||
                (currentFile.isGitDiff && currentFile.oldName && currentFile.newName && !currentBlock))) {
            startBlock(line);
            return;
        }
        if (currentBlock && (line.startsWith('+') || line.startsWith('-') || line.startsWith(' '))) {
            createLine(line);
            return;
        }
        var doesNotExistHunkHeader = !existHunkHeader(line, lineIndex);
        if (currentFile === null) {
            throw new Error('Where is my file !!!');
        }
        if ((values = oldMode.exec(line))) {
            currentFile.oldMode = values[1];
        }
        else if ((values = newMode.exec(line))) {
            currentFile.newMode = values[1];
        }
        else if ((values = deletedFileMode.exec(line))) {
            currentFile.deletedFileMode = values[1];
            currentFile.isDeleted = true;
        }
        else if ((values = newFileMode.exec(line))) {
            currentFile.newFileMode = values[1];
            currentFile.isNew = true;
        }
        else if ((values = copyFrom.exec(line))) {
            if (doesNotExistHunkHeader) {
                currentFile.oldName = values[1];
            }
            currentFile.isCopy = true;
        }
        else if ((values = copyTo.exec(line))) {
            if (doesNotExistHunkHeader) {
                currentFile.newName = values[1];
            }
            currentFile.isCopy = true;
        }
        else if ((values = renameFrom.exec(line))) {
            if (doesNotExistHunkHeader) {
                currentFile.oldName = values[1];
            }
            currentFile.isRename = true;
        }
        else if ((values = renameTo.exec(line))) {
            if (doesNotExistHunkHeader) {
                currentFile.newName = values[1];
            }
            currentFile.isRename = true;
        }
        else if ((values = binaryFiles.exec(line))) {
            currentFile.isBinary = true;
            currentFile.oldName = getFilename(values[1], undefined, config.srcPrefix);
            currentFile.newName = getFilename(values[2], undefined, config.dstPrefix);
            startBlock('Binary file');
        }
        else if (binaryDiff.test(line)) {
            currentFile.isBinary = true;
            startBlock(line);
        }
        else if ((values = similarityIndex.exec(line))) {
            currentFile.unchangedPercentage = parseInt(values[1], 10);
        }
        else if ((values = dissimilarityIndex.exec(line))) {
            currentFile.changedPercentage = parseInt(values[1], 10);
        }
        else if ((values = index.exec(line))) {
            currentFile.checksumBefore = values[1];
            currentFile.checksumAfter = values[2];
            values[3] && (currentFile.mode = values[3]);
        }
        else if ((values = combinedIndex.exec(line))) {
            currentFile.checksumBefore = [values[2], values[3]];
            currentFile.checksumAfter = values[1];
        }
        else if ((values = combinedMode.exec(line))) {
            currentFile.oldMode = [values[2], values[3]];
            currentFile.newMode = values[1];
        }
        else if ((values = combinedNewFile.exec(line))) {
            currentFile.newFileMode = values[1];
            currentFile.isNew = true;
        }
        else if ((values = combinedDeletedFile.exec(line))) {
            currentFile.deletedFileMode = values[1];
            currentFile.isDeleted = true;
        }
    });
    saveBlock();
    saveFile();
    return files;
}
//# sourceMappingURL=diff-parser.js.map
;// CONCATENATED MODULE: ./node_modules/diff2html/node_modules/diff/lib/index.mjs
function Diff() {}
Diff.prototype = {
  diff: function diff(oldString, newString) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var callback = options.callback;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    this.options = options;
    var self = this;

    function done(value) {
      if (callback) {
        setTimeout(function () {
          callback(undefined, value);
        }, 0);
        return true;
      } else {
        return value;
      }
    } // Allow subclasses to massage the input prior to running


    oldString = this.castInput(oldString);
    newString = this.castInput(newString);
    oldString = this.removeEmpty(this.tokenize(oldString));
    newString = this.removeEmpty(this.tokenize(newString));
    var newLen = newString.length,
        oldLen = oldString.length;
    var editLength = 1;
    var maxEditLength = newLen + oldLen;

    if (options.maxEditLength) {
      maxEditLength = Math.min(maxEditLength, options.maxEditLength);
    }

    var bestPath = [{
      newPos: -1,
      components: []
    }]; // Seed editLength = 0, i.e. the content starts with the same values

    var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);

    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
      // Identity per the equality and tokenizer
      return done([{
        value: this.join(newString),
        count: newString.length
      }]);
    } // Main worker method. checks all permutations of a given edit length for acceptance.


    function execEditLength() {
      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
        var basePath = void 0;

        var addPath = bestPath[diagonalPath - 1],
            removePath = bestPath[diagonalPath + 1],
            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;

        if (addPath) {
          // No one else is going to attempt to use this value, clear it
          bestPath[diagonalPath - 1] = undefined;
        }

        var canAdd = addPath && addPath.newPos + 1 < newLen,
            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;

        if (!canAdd && !canRemove) {
          // If this path is a terminal then prune
          bestPath[diagonalPath] = undefined;
          continue;
        } // Select the diagonal that we want to branch from. We select the prior
        // path whose position in the new string is the farthest from the origin
        // and does not pass the bounds of the diff graph


        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
          basePath = clonePath(removePath);
          self.pushComponent(basePath.components, undefined, true);
        } else {
          basePath = addPath; // No need to clone, we've pulled it from the list

          basePath.newPos++;
          self.pushComponent(basePath.components, true, undefined);
        }

        _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath); // If we have hit the end of both strings, then we are done

        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
          return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
        } else {
          // Otherwise track this path as a potential candidate and continue.
          bestPath[diagonalPath] = basePath;
        }
      }

      editLength++;
    } // Performs the length of edit iteration. Is a bit fugly as this has to support the
    // sync and async mode which is never fun. Loops over execEditLength until a value
    // is produced, or until the edit length exceeds options.maxEditLength (if given),
    // in which case it will return undefined.


    if (callback) {
      (function exec() {
        setTimeout(function () {
          if (editLength > maxEditLength) {
            return callback();
          }

          if (!execEditLength()) {
            exec();
          }
        }, 0);
      })();
    } else {
      while (editLength <= maxEditLength) {
        var ret = execEditLength();

        if (ret) {
          return ret;
        }
      }
    }
  },
  pushComponent: function pushComponent(components, added, removed) {
    var last = components[components.length - 1];

    if (last && last.added === added && last.removed === removed) {
      // We need to clone here as the component clone operation is just
      // as shallow array clone
      components[components.length - 1] = {
        count: last.count + 1,
        added: added,
        removed: removed
      };
    } else {
      components.push({
        count: 1,
        added: added,
        removed: removed
      });
    }
  },
  extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
    var newLen = newString.length,
        oldLen = oldString.length,
        newPos = basePath.newPos,
        oldPos = newPos - diagonalPath,
        commonCount = 0;

    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
      newPos++;
      oldPos++;
      commonCount++;
    }

    if (commonCount) {
      basePath.components.push({
        count: commonCount
      });
    }

    basePath.newPos = newPos;
    return oldPos;
  },
  equals: function equals(left, right) {
    if (this.options.comparator) {
      return this.options.comparator(left, right);
    } else {
      return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
    }
  },
  removeEmpty: function removeEmpty(array) {
    var ret = [];

    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        ret.push(array[i]);
      }
    }

    return ret;
  },
  castInput: function castInput(value) {
    return value;
  },
  tokenize: function tokenize(value) {
    return value.split('');
  },
  join: function join(chars) {
    return chars.join('');
  }
};

function buildValues(diff, components, newString, oldString, useLongestToken) {
  var componentPos = 0,
      componentLen = components.length,
      newPos = 0,
      oldPos = 0;

  for (; componentPos < componentLen; componentPos++) {
    var component = components[componentPos];

    if (!component.removed) {
      if (!component.added && useLongestToken) {
        var value = newString.slice(newPos, newPos + component.count);
        value = value.map(function (value, i) {
          var oldValue = oldString[oldPos + i];
          return oldValue.length > value.length ? oldValue : value;
        });
        component.value = diff.join(value);
      } else {
        component.value = diff.join(newString.slice(newPos, newPos + component.count));
      }

      newPos += component.count; // Common case

      if (!component.added) {
        oldPos += component.count;
      }
    } else {
      component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
      oldPos += component.count; // Reverse add and remove so removes are output first to match common convention
      // The diffing algorithm is tied to add then remove output and this is the simplest
      // route to get the desired output with minimal overhead.

      if (componentPos && components[componentPos - 1].added) {
        var tmp = components[componentPos - 1];
        components[componentPos - 1] = components[componentPos];
        components[componentPos] = tmp;
      }
    }
  } // Special case handle for when one terminal is ignored (i.e. whitespace).
  // For this case we merge the terminal into the prior string and drop the change.
  // This is only available for string mode.


  var lastComponent = components[componentLen - 1];

  if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
    components[componentLen - 2].value += lastComponent.value;
    components.pop();
  }

  return components;
}

function clonePath(path) {
  return {
    newPos: path.newPos,
    components: path.components.slice(0)
  };
}

var characterDiff = new Diff();
function diffChars(oldStr, newStr, options) {
  return characterDiff.diff(oldStr, newStr, options);
}

function generateOptions(options, defaults) {
  if (typeof options === 'function') {
    defaults.callback = options;
  } else if (options) {
    for (var name in options) {
      /* istanbul ignore else */
      if (options.hasOwnProperty(name)) {
        defaults[name] = options[name];
      }
    }
  }

  return defaults;
}

//
// Ranges and exceptions:
// Latin-1 Supplement, 0080–00FF
//  - U+00D7  × Multiplication sign
//  - U+00F7  ÷ Division sign
// Latin Extended-A, 0100–017F
// Latin Extended-B, 0180–024F
// IPA Extensions, 0250–02AF
// Spacing Modifier Letters, 02B0–02FF
//  - U+02C7  ˇ &#711;  Caron
//  - U+02D8  ˘ &#728;  Breve
//  - U+02D9  ˙ &#729;  Dot Above
//  - U+02DA  ˚ &#730;  Ring Above
//  - U+02DB  ˛ &#731;  Ogonek
//  - U+02DC  ˜ &#732;  Small Tilde
//  - U+02DD  ˝ &#733;  Double Acute Accent
// Latin Extended Additional, 1E00–1EFF

var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
var reWhitespace = /\S/;
var wordDiff = new Diff();

wordDiff.equals = function (left, right) {
  if (this.options.ignoreCase) {
    left = left.toLowerCase();
    right = right.toLowerCase();
  }

  return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
};

wordDiff.tokenize = function (value) {
  // All whitespace symbols except newline group into one token, each newline - in separate token
  var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/); // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.

  for (var i = 0; i < tokens.length - 1; i++) {
    // If we have an empty string in the next field and we have only word chars before and after, merge
    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
      tokens[i] += tokens[i + 2];
      tokens.splice(i + 1, 2);
      i--;
    }
  }

  return tokens;
};

function diffWords(oldStr, newStr, options) {
  options = generateOptions(options, {
    ignoreWhitespace: true
  });
  return wordDiff.diff(oldStr, newStr, options);
}
function diffWordsWithSpace(oldStr, newStr, options) {
  return wordDiff.diff(oldStr, newStr, options);
}

var lineDiff = new Diff();

lineDiff.tokenize = function (value) {
  var retLines = [],
      linesAndNewlines = value.split(/(\n|\r\n)/); // Ignore the final empty token that occurs if the string ends with a new line

  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  } // Merge the content and line separators into single tokens


  for (var i = 0; i < linesAndNewlines.length; i++) {
    var line = linesAndNewlines[i];

    if (i % 2 && !this.options.newlineIsToken) {
      retLines[retLines.length - 1] += line;
    } else {
      if (this.options.ignoreWhitespace) {
        line = line.trim();
      }

      retLines.push(line);
    }
  }

  return retLines;
};

function diffLines(oldStr, newStr, callback) {
  return lineDiff.diff(oldStr, newStr, callback);
}
function diffTrimmedLines(oldStr, newStr, callback) {
  var options = generateOptions(callback, {
    ignoreWhitespace: true
  });
  return lineDiff.diff(oldStr, newStr, options);
}

var sentenceDiff = new Diff();

sentenceDiff.tokenize = function (value) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};

function diffSentences(oldStr, newStr, callback) {
  return sentenceDiff.diff(oldStr, newStr, callback);
}

var cssDiff = new Diff();

cssDiff.tokenize = function (value) {
  return value.split(/([{}:;,]|\s+)/);
};

function diffCss(oldStr, newStr, callback) {
  return cssDiff.diff(oldStr, newStr, callback);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var objectPrototypeToString = Object.prototype.toString;
var jsonDiff = new Diff(); // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
// dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:

jsonDiff.useLongestToken = true;
jsonDiff.tokenize = lineDiff.tokenize;

jsonDiff.castInput = function (value) {
  var _this$options = this.options,
      undefinedReplacement = _this$options.undefinedReplacement,
      _this$options$stringi = _this$options.stringifyReplacer,
      stringifyReplacer = _this$options$stringi === void 0 ? function (k, v) {
    return typeof v === 'undefined' ? undefinedReplacement : v;
  } : _this$options$stringi;
  return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
};

jsonDiff.equals = function (left, right) {
  return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
};

function diffJson(oldObj, newObj, options) {
  return jsonDiff.diff(oldObj, newObj, options);
} // This function handles the presence of circular references by bailing out when encountering an
// object that is already on the "stack" of items being processed. Accepts an optional replacer

function canonicalize(obj, stack, replacementStack, replacer, key) {
  stack = stack || [];
  replacementStack = replacementStack || [];

  if (replacer) {
    obj = replacer(key, obj);
  }

  var i;

  for (i = 0; i < stack.length; i += 1) {
    if (stack[i] === obj) {
      return replacementStack[i];
    }
  }

  var canonicalizedObj;

  if ('[object Array]' === objectPrototypeToString.call(obj)) {
    stack.push(obj);
    canonicalizedObj = new Array(obj.length);
    replacementStack.push(canonicalizedObj);

    for (i = 0; i < obj.length; i += 1) {
      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
    }

    stack.pop();
    replacementStack.pop();
    return canonicalizedObj;
  }

  if (obj && obj.toJSON) {
    obj = obj.toJSON();
  }

  if (_typeof(obj) === 'object' && obj !== null) {
    stack.push(obj);
    canonicalizedObj = {};
    replacementStack.push(canonicalizedObj);

    var sortedKeys = [],
        _key;

    for (_key in obj) {
      /* istanbul ignore else */
      if (obj.hasOwnProperty(_key)) {
        sortedKeys.push(_key);
      }
    }

    sortedKeys.sort();

    for (i = 0; i < sortedKeys.length; i += 1) {
      _key = sortedKeys[i];
      canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
    }

    stack.pop();
    replacementStack.pop();
  } else {
    canonicalizedObj = obj;
  }

  return canonicalizedObj;
}

var arrayDiff = new Diff();

arrayDiff.tokenize = function (value) {
  return value.slice();
};

arrayDiff.join = arrayDiff.removeEmpty = function (value) {
  return value;
};

function diffArrays(oldArr, newArr, callback) {
  return arrayDiff.diff(oldArr, newArr, callback);
}

function parsePatch(uniDiff) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
      delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      list = [],
      i = 0;

  function parseIndex() {
    var index = {};
    list.push(index); // Parse diff metadata

    while (i < diffstr.length) {
      var line = diffstr[i]; // File header found, end parsing diff metadata

      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
        break;
      } // Diff index


      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);

      if (header) {
        index.index = header[1];
      }

      i++;
    } // Parse file headers if they are defined. Unified diff requires them, but
    // there's no technical issues to have an isolated hunk without file header


    parseFileHeader(index);
    parseFileHeader(index); // Parse hunks

    index.hunks = [];

    while (i < diffstr.length) {
      var _line = diffstr[i];

      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
        break;
      } else if (/^@@/.test(_line)) {
        index.hunks.push(parseHunk());
      } else if (_line && options.strict) {
        // Ignore unexpected content unless in strict mode
        throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
      } else {
        i++;
      }
    }
  } // Parses the --- and +++ headers, if none are found, no lines
  // are consumed.


  function parseFileHeader(index) {
    var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);

    if (fileHeader) {
      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
      var data = fileHeader[2].split('\t', 2);
      var fileName = data[0].replace(/\\\\/g, '\\');

      if (/^".*"$/.test(fileName)) {
        fileName = fileName.substr(1, fileName.length - 2);
      }

      index[keyPrefix + 'FileName'] = fileName;
      index[keyPrefix + 'Header'] = (data[1] || '').trim();
      i++;
    }
  } // Parses a hunk
  // This assumes that we are at the start of a hunk.


  function parseHunk() {
    var chunkHeaderIndex = i,
        chunkHeaderLine = diffstr[i++],
        chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
    var hunk = {
      oldStart: +chunkHeader[1],
      oldLines: typeof chunkHeader[2] === 'undefined' ? 1 : +chunkHeader[2],
      newStart: +chunkHeader[3],
      newLines: typeof chunkHeader[4] === 'undefined' ? 1 : +chunkHeader[4],
      lines: [],
      linedelimiters: []
    }; // Unified Diff Format quirk: If the chunk size is 0,
    // the first number is one lower than one would expect.
    // https://www.artima.com/weblogs/viewpost.jsp?thread=164293

    if (hunk.oldLines === 0) {
      hunk.oldStart += 1;
    }

    if (hunk.newLines === 0) {
      hunk.newStart += 1;
    }

    var addCount = 0,
        removeCount = 0;

    for (; i < diffstr.length; i++) {
      // Lines starting with '---' could be mistaken for the "remove line" operation
      // But they could be the header for the next file. Therefore prune such cases out.
      if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
        break;
      }

      var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];

      if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
        hunk.lines.push(diffstr[i]);
        hunk.linedelimiters.push(delimiters[i] || '\n');

        if (operation === '+') {
          addCount++;
        } else if (operation === '-') {
          removeCount++;
        } else if (operation === ' ') {
          addCount++;
          removeCount++;
        }
      } else {
        break;
      }
    } // Handle the empty block count case


    if (!addCount && hunk.newLines === 1) {
      hunk.newLines = 0;
    }

    if (!removeCount && hunk.oldLines === 1) {
      hunk.oldLines = 0;
    } // Perform optional sanity checking


    if (options.strict) {
      if (addCount !== hunk.newLines) {
        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
      }

      if (removeCount !== hunk.oldLines) {
        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
      }
    }

    return hunk;
  }

  while (i < diffstr.length) {
    parseIndex();
  }

  return list;
}

// Iterator that traverses in the range of [min, max], stepping
// by distance from a given start position. I.e. for [0, 4], with
// start of 2, this will iterate 2, 3, 1, 4, 0.
function distanceIterator (start, minLine, maxLine) {
  var wantForward = true,
      backwardExhausted = false,
      forwardExhausted = false,
      localOffset = 1;
  return function iterator() {
    if (wantForward && !forwardExhausted) {
      if (backwardExhausted) {
        localOffset++;
      } else {
        wantForward = false;
      } // Check if trying to fit beyond text length, and if not, check it fits
      // after offset location (or desired location on first iteration)


      if (start + localOffset <= maxLine) {
        return localOffset;
      }

      forwardExhausted = true;
    }

    if (!backwardExhausted) {
      if (!forwardExhausted) {
        wantForward = true;
      } // Check if trying to fit before text beginning, and if not, check it fits
      // before offset location


      if (minLine <= start - localOffset) {
        return -localOffset++;
      }

      backwardExhausted = true;
      return iterator();
    } // We tried to fit hunk before text beginning and beyond text length, then
    // hunk can't fit on the text. Return undefined

  };
}

function applyPatch(source, uniDiff) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (typeof uniDiff === 'string') {
    uniDiff = parsePatch(uniDiff);
  }

  if (Array.isArray(uniDiff)) {
    if (uniDiff.length > 1) {
      throw new Error('applyPatch only works with a single input.');
    }

    uniDiff = uniDiff[0];
  } // Apply the diff to the input


  var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
      delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      hunks = uniDiff.hunks,
      compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) {
    return line === patchContent;
  },
      errorCount = 0,
      fuzzFactor = options.fuzzFactor || 0,
      minLine = 0,
      offset = 0,
      removeEOFNL,
      addEOFNL;
  /**
   * Checks if the hunk exactly fits on the provided location
   */


  function hunkFits(hunk, toPos) {
    for (var j = 0; j < hunk.lines.length; j++) {
      var line = hunk.lines[j],
          operation = line.length > 0 ? line[0] : ' ',
          content = line.length > 0 ? line.substr(1) : line;

      if (operation === ' ' || operation === '-') {
        // Context sanity check
        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
          errorCount++;

          if (errorCount > fuzzFactor) {
            return false;
          }
        }

        toPos++;
      }
    }

    return true;
  } // Search best fit offsets for each hunk based on the previous ones


  for (var i = 0; i < hunks.length; i++) {
    var hunk = hunks[i],
        maxLine = lines.length - hunk.oldLines,
        localOffset = 0,
        toPos = offset + hunk.oldStart - 1;
    var iterator = distanceIterator(toPos, minLine, maxLine);

    for (; localOffset !== undefined; localOffset = iterator()) {
      if (hunkFits(hunk, toPos + localOffset)) {
        hunk.offset = offset += localOffset;
        break;
      }
    }

    if (localOffset === undefined) {
      return false;
    } // Set lower text limit to end of the current hunk, so next ones don't try
    // to fit over already patched text


    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
  } // Apply patch hunks


  var diffOffset = 0;

  for (var _i = 0; _i < hunks.length; _i++) {
    var _hunk = hunks[_i],
        _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;

    diffOffset += _hunk.newLines - _hunk.oldLines;

    for (var j = 0; j < _hunk.lines.length; j++) {
      var line = _hunk.lines[j],
          operation = line.length > 0 ? line[0] : ' ',
          content = line.length > 0 ? line.substr(1) : line,
          delimiter = _hunk.linedelimiters[j];

      if (operation === ' ') {
        _toPos++;
      } else if (operation === '-') {
        lines.splice(_toPos, 1);
        delimiters.splice(_toPos, 1);
        /* istanbul ignore else */
      } else if (operation === '+') {
        lines.splice(_toPos, 0, content);
        delimiters.splice(_toPos, 0, delimiter);
        _toPos++;
      } else if (operation === '\\') {
        var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;

        if (previousOperation === '+') {
          removeEOFNL = true;
        } else if (previousOperation === '-') {
          addEOFNL = true;
        }
      }
    }
  } // Handle EOFNL insertion/removal


  if (removeEOFNL) {
    while (!lines[lines.length - 1]) {
      lines.pop();
      delimiters.pop();
    }
  } else if (addEOFNL) {
    lines.push('');
    delimiters.push('\n');
  }

  for (var _k = 0; _k < lines.length - 1; _k++) {
    lines[_k] = lines[_k] + delimiters[_k];
  }

  return lines.join('');
} // Wrapper that supports multiple file patches via callbacks.

function applyPatches(uniDiff, options) {
  if (typeof uniDiff === 'string') {
    uniDiff = parsePatch(uniDiff);
  }

  var currentIndex = 0;

  function processIndex() {
    var index = uniDiff[currentIndex++];

    if (!index) {
      return options.complete();
    }

    options.loadFile(index, function (err, data) {
      if (err) {
        return options.complete(err);
      }

      var updatedContent = applyPatch(data, index, options);
      options.patched(index, updatedContent, function (err) {
        if (err) {
          return options.complete(err);
        }

        processIndex();
      });
    });
  }

  processIndex();
}

function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  if (!options) {
    options = {};
  }

  if (typeof options.context === 'undefined') {
    options.context = 4;
  }

  var diff = diffLines(oldStr, newStr, options);

  if (!diff) {
    return;
  }

  diff.push({
    value: '',
    lines: []
  }); // Append an empty value to make cleanup easier

  function contextLines(lines) {
    return lines.map(function (entry) {
      return ' ' + entry;
    });
  }

  var hunks = [];
  var oldRangeStart = 0,
      newRangeStart = 0,
      curRange = [],
      oldLine = 1,
      newLine = 1;

  var _loop = function _loop(i) {
    var current = diff[i],
        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
    current.lines = lines;

    if (current.added || current.removed) {
      var _curRange;

      // If we have previous context, start with that
      if (!oldRangeStart) {
        var prev = diff[i - 1];
        oldRangeStart = oldLine;
        newRangeStart = newLine;

        if (prev) {
          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
          oldRangeStart -= curRange.length;
          newRangeStart -= curRange.length;
        }
      } // Output our changes


      (_curRange = curRange).push.apply(_curRange, _toConsumableArray(lines.map(function (entry) {
        return (current.added ? '+' : '-') + entry;
      }))); // Track the updated file position


      if (current.added) {
        newLine += lines.length;
      } else {
        oldLine += lines.length;
      }
    } else {
      // Identical context lines. Track line changes
      if (oldRangeStart) {
        // Close out any changes that have been output (or join overlapping)
        if (lines.length <= options.context * 2 && i < diff.length - 2) {
          var _curRange2;

          // Overlapping
          (_curRange2 = curRange).push.apply(_curRange2, _toConsumableArray(contextLines(lines)));
        } else {
          var _curRange3;

          // end the range and output
          var contextSize = Math.min(lines.length, options.context);

          (_curRange3 = curRange).push.apply(_curRange3, _toConsumableArray(contextLines(lines.slice(0, contextSize))));

          var hunk = {
            oldStart: oldRangeStart,
            oldLines: oldLine - oldRangeStart + contextSize,
            newStart: newRangeStart,
            newLines: newLine - newRangeStart + contextSize,
            lines: curRange
          };

          if (i >= diff.length - 2 && lines.length <= options.context) {
            // EOF is inside this hunk
            var oldEOFNewline = /\n$/.test(oldStr);
            var newEOFNewline = /\n$/.test(newStr);
            var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;

            if (!oldEOFNewline && noNlBeforeAdds && oldStr.length > 0) {
              // special case: old has no eol and no trailing context; no-nl can end up before adds
              // however, if the old file is empty, do not output the no-nl line
              curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
            }

            if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
              curRange.push('\\ No newline at end of file');
            }
          }

          hunks.push(hunk);
          oldRangeStart = 0;
          newRangeStart = 0;
          curRange = [];
        }
      }

      oldLine += lines.length;
      newLine += lines.length;
    }
  };

  for (var i = 0; i < diff.length; i++) {
    _loop(i);
  }

  return {
    oldFileName: oldFileName,
    newFileName: newFileName,
    oldHeader: oldHeader,
    newHeader: newHeader,
    hunks: hunks
  };
}
function formatPatch(diff) {
  var ret = [];

  if (diff.oldFileName == diff.newFileName) {
    ret.push('Index: ' + diff.oldFileName);
  }

  ret.push('===================================================================');
  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

  for (var i = 0; i < diff.hunks.length; i++) {
    var hunk = diff.hunks[i]; // Unified Diff Format quirk: If the chunk size is 0,
    // the first number is one lower than one would expect.
    // https://www.artima.com/weblogs/viewpost.jsp?thread=164293

    if (hunk.oldLines === 0) {
      hunk.oldStart -= 1;
    }

    if (hunk.newLines === 0) {
      hunk.newStart -= 1;
    }

    ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
    ret.push.apply(ret, hunk.lines);
  }

  return ret.join('\n') + '\n';
}
function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  return formatPatch(structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options));
}
function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
}

function arrayEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  return arrayStartsWith(a, b);
}
function arrayStartsWith(array, start) {
  if (start.length > array.length) {
    return false;
  }

  for (var i = 0; i < start.length; i++) {
    if (start[i] !== array[i]) {
      return false;
    }
  }

  return true;
}

function calcLineCount(hunk) {
  var _calcOldNewLineCount = calcOldNewLineCount(hunk.lines),
      oldLines = _calcOldNewLineCount.oldLines,
      newLines = _calcOldNewLineCount.newLines;

  if (oldLines !== undefined) {
    hunk.oldLines = oldLines;
  } else {
    delete hunk.oldLines;
  }

  if (newLines !== undefined) {
    hunk.newLines = newLines;
  } else {
    delete hunk.newLines;
  }
}
function merge(mine, theirs, base) {
  mine = loadPatch(mine, base);
  theirs = loadPatch(theirs, base);
  var ret = {}; // For index we just let it pass through as it doesn't have any necessary meaning.
  // Leaving sanity checks on this to the API consumer that may know more about the
  // meaning in their own context.

  if (mine.index || theirs.index) {
    ret.index = mine.index || theirs.index;
  }

  if (mine.newFileName || theirs.newFileName) {
    if (!fileNameChanged(mine)) {
      // No header or no change in ours, use theirs (and ours if theirs does not exist)
      ret.oldFileName = theirs.oldFileName || mine.oldFileName;
      ret.newFileName = theirs.newFileName || mine.newFileName;
      ret.oldHeader = theirs.oldHeader || mine.oldHeader;
      ret.newHeader = theirs.newHeader || mine.newHeader;
    } else if (!fileNameChanged(theirs)) {
      // No header or no change in theirs, use ours
      ret.oldFileName = mine.oldFileName;
      ret.newFileName = mine.newFileName;
      ret.oldHeader = mine.oldHeader;
      ret.newHeader = mine.newHeader;
    } else {
      // Both changed... figure it out
      ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
      ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
      ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
      ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
    }
  }

  ret.hunks = [];
  var mineIndex = 0,
      theirsIndex = 0,
      mineOffset = 0,
      theirsOffset = 0;

  while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
    var mineCurrent = mine.hunks[mineIndex] || {
      oldStart: Infinity
    },
        theirsCurrent = theirs.hunks[theirsIndex] || {
      oldStart: Infinity
    };

    if (hunkBefore(mineCurrent, theirsCurrent)) {
      // This patch does not overlap with any of the others, yay.
      ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
      mineIndex++;
      theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
    } else if (hunkBefore(theirsCurrent, mineCurrent)) {
      // This patch does not overlap with any of the others, yay.
      ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
      theirsIndex++;
      mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
    } else {
      // Overlap, merge as best we can
      var mergedHunk = {
        oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
        oldLines: 0,
        newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
        newLines: 0,
        lines: []
      };
      mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
      theirsIndex++;
      mineIndex++;
      ret.hunks.push(mergedHunk);
    }
  }

  return ret;
}

function loadPatch(param, base) {
  if (typeof param === 'string') {
    if (/^@@/m.test(param) || /^Index:/m.test(param)) {
      return parsePatch(param)[0];
    }

    if (!base) {
      throw new Error('Must provide a base reference or pass in a patch');
    }

    return structuredPatch(undefined, undefined, base, param);
  }

  return param;
}

function fileNameChanged(patch) {
  return patch.newFileName && patch.newFileName !== patch.oldFileName;
}

function selectField(index, mine, theirs) {
  if (mine === theirs) {
    return mine;
  } else {
    index.conflict = true;
    return {
      mine: mine,
      theirs: theirs
    };
  }
}

function hunkBefore(test, check) {
  return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
}

function cloneHunk(hunk, offset) {
  return {
    oldStart: hunk.oldStart,
    oldLines: hunk.oldLines,
    newStart: hunk.newStart + offset,
    newLines: hunk.newLines,
    lines: hunk.lines
  };
}

function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
  // This will generally result in a conflicted hunk, but there are cases where the context
  // is the only overlap where we can successfully merge the content here.
  var mine = {
    offset: mineOffset,
    lines: mineLines,
    index: 0
  },
      their = {
    offset: theirOffset,
    lines: theirLines,
    index: 0
  }; // Handle any leading content

  insertLeading(hunk, mine, their);
  insertLeading(hunk, their, mine); // Now in the overlap content. Scan through and select the best changes from each.

  while (mine.index < mine.lines.length && their.index < their.lines.length) {
    var mineCurrent = mine.lines[mine.index],
        theirCurrent = their.lines[their.index];

    if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
      // Both modified ...
      mutualChange(hunk, mine, their);
    } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
      var _hunk$lines;

      // Mine inserted
      (_hunk$lines = hunk.lines).push.apply(_hunk$lines, _toConsumableArray(collectChange(mine)));
    } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
      var _hunk$lines2;

      // Theirs inserted
      (_hunk$lines2 = hunk.lines).push.apply(_hunk$lines2, _toConsumableArray(collectChange(their)));
    } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
      // Mine removed or edited
      removal(hunk, mine, their);
    } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
      // Their removed or edited
      removal(hunk, their, mine, true);
    } else if (mineCurrent === theirCurrent) {
      // Context identity
      hunk.lines.push(mineCurrent);
      mine.index++;
      their.index++;
    } else {
      // Context mismatch
      conflict(hunk, collectChange(mine), collectChange(their));
    }
  } // Now push anything that may be remaining


  insertTrailing(hunk, mine);
  insertTrailing(hunk, their);
  calcLineCount(hunk);
}

function mutualChange(hunk, mine, their) {
  var myChanges = collectChange(mine),
      theirChanges = collectChange(their);

  if (allRemoves(myChanges) && allRemoves(theirChanges)) {
    // Special case for remove changes that are supersets of one another
    if (arrayStartsWith(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
      var _hunk$lines3;

      (_hunk$lines3 = hunk.lines).push.apply(_hunk$lines3, _toConsumableArray(myChanges));

      return;
    } else if (arrayStartsWith(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
      var _hunk$lines4;

      (_hunk$lines4 = hunk.lines).push.apply(_hunk$lines4, _toConsumableArray(theirChanges));

      return;
    }
  } else if (arrayEqual(myChanges, theirChanges)) {
    var _hunk$lines5;

    (_hunk$lines5 = hunk.lines).push.apply(_hunk$lines5, _toConsumableArray(myChanges));

    return;
  }

  conflict(hunk, myChanges, theirChanges);
}

function removal(hunk, mine, their, swap) {
  var myChanges = collectChange(mine),
      theirChanges = collectContext(their, myChanges);

  if (theirChanges.merged) {
    var _hunk$lines6;

    (_hunk$lines6 = hunk.lines).push.apply(_hunk$lines6, _toConsumableArray(theirChanges.merged));
  } else {
    conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
  }
}

function conflict(hunk, mine, their) {
  hunk.conflict = true;
  hunk.lines.push({
    conflict: true,
    mine: mine,
    theirs: their
  });
}

function insertLeading(hunk, insert, their) {
  while (insert.offset < their.offset && insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
    insert.offset++;
  }
}

function insertTrailing(hunk, insert) {
  while (insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
  }
}

function collectChange(state) {
  var ret = [],
      operation = state.lines[state.index][0];

  while (state.index < state.lines.length) {
    var line = state.lines[state.index]; // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.

    if (operation === '-' && line[0] === '+') {
      operation = '+';
    }

    if (operation === line[0]) {
      ret.push(line);
      state.index++;
    } else {
      break;
    }
  }

  return ret;
}

function collectContext(state, matchChanges) {
  var changes = [],
      merged = [],
      matchIndex = 0,
      contextChanges = false,
      conflicted = false;

  while (matchIndex < matchChanges.length && state.index < state.lines.length) {
    var change = state.lines[state.index],
        match = matchChanges[matchIndex]; // Once we've hit our add, then we are done

    if (match[0] === '+') {
      break;
    }

    contextChanges = contextChanges || change[0] !== ' ';
    merged.push(match);
    matchIndex++; // Consume any additions in the other block as a conflict to attempt
    // to pull in the remaining context after this

    if (change[0] === '+') {
      conflicted = true;

      while (change[0] === '+') {
        changes.push(change);
        change = state.lines[++state.index];
      }
    }

    if (match.substr(1) === change.substr(1)) {
      changes.push(change);
      state.index++;
    } else {
      conflicted = true;
    }
  }

  if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
    conflicted = true;
  }

  if (conflicted) {
    return changes;
  }

  while (matchIndex < matchChanges.length) {
    merged.push(matchChanges[matchIndex++]);
  }

  return {
    merged: merged,
    changes: changes
  };
}

function allRemoves(changes) {
  return changes.reduce(function (prev, change) {
    return prev && change[0] === '-';
  }, true);
}

function skipRemoveSuperset(state, removeChanges, delta) {
  for (var i = 0; i < delta; i++) {
    var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);

    if (state.lines[state.index + i] !== ' ' + changeContent) {
      return false;
    }
  }

  state.index += delta;
  return true;
}

function calcOldNewLineCount(lines) {
  var oldLines = 0;
  var newLines = 0;
  lines.forEach(function (line) {
    if (typeof line !== 'string') {
      var myCount = calcOldNewLineCount(line.mine);
      var theirCount = calcOldNewLineCount(line.theirs);

      if (oldLines !== undefined) {
        if (myCount.oldLines === theirCount.oldLines) {
          oldLines += myCount.oldLines;
        } else {
          oldLines = undefined;
        }
      }

      if (newLines !== undefined) {
        if (myCount.newLines === theirCount.newLines) {
          newLines += myCount.newLines;
        } else {
          newLines = undefined;
        }
      }
    } else {
      if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {
        newLines++;
      }

      if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {
        oldLines++;
      }
    }
  });
  return {
    oldLines: oldLines,
    newLines: newLines
  };
}

// See: http://code.google.com/p/google-diff-match-patch/wiki/API
function convertChangesToDMP(changes) {
  var ret = [],
      change,
      operation;

  for (var i = 0; i < changes.length; i++) {
    change = changes[i];

    if (change.added) {
      operation = 1;
    } else if (change.removed) {
      operation = -1;
    } else {
      operation = 0;
    }

    ret.push([operation, change.value]);
  }

  return ret;
}

function convertChangesToXML(changes) {
  var ret = [];

  for (var i = 0; i < changes.length; i++) {
    var change = changes[i];

    if (change.added) {
      ret.push('<ins>');
    } else if (change.removed) {
      ret.push('<del>');
    }

    ret.push(escapeHTML(change.value));

    if (change.added) {
      ret.push('</ins>');
    } else if (change.removed) {
      ret.push('</del>');
    }
  }

  return ret.join('');
}

function escapeHTML(s) {
  var n = s;
  n = n.replace(/&/g, '&amp;');
  n = n.replace(/</g, '&lt;');
  n = n.replace(/>/g, '&gt;');
  n = n.replace(/"/g, '&quot;');
  return n;
}



;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/rematch.js
function levenshtein(a, b) {
    if (a.length === 0) {
        return b.length;
    }
    if (b.length === 0) {
        return a.length;
    }
    var matrix = [];
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}
function newDistanceFn(str) {
    return function (x, y) {
        var xValue = str(x).trim();
        var yValue = str(y).trim();
        var lev = levenshtein(xValue, yValue);
        return lev / (xValue.length + yValue.length);
    };
}
function newMatcherFn(distance) {
    function findBestMatch(a, b, cache) {
        if (cache === void 0) { cache = new Map(); }
        var bestMatchDist = Infinity;
        var bestMatch;
        for (var i = 0; i < a.length; ++i) {
            for (var j = 0; j < b.length; ++j) {
                var cacheKey = JSON.stringify([a[i], b[j]]);
                var md = void 0;
                if (!(cache.has(cacheKey) && (md = cache.get(cacheKey)))) {
                    md = distance(a[i], b[j]);
                    cache.set(cacheKey, md);
                }
                if (md < bestMatchDist) {
                    bestMatchDist = md;
                    bestMatch = { indexA: i, indexB: j, score: bestMatchDist };
                }
            }
        }
        return bestMatch;
    }
    function group(a, b, level, cache) {
        if (level === void 0) { level = 0; }
        if (cache === void 0) { cache = new Map(); }
        var bm = findBestMatch(a, b, cache);
        if (!bm || a.length + b.length < 3) {
            return [[a, b]];
        }
        var a1 = a.slice(0, bm.indexA);
        var b1 = b.slice(0, bm.indexB);
        var aMatch = [a[bm.indexA]];
        var bMatch = [b[bm.indexB]];
        var tailA = bm.indexA + 1;
        var tailB = bm.indexB + 1;
        var a2 = a.slice(tailA);
        var b2 = b.slice(tailB);
        var group1 = group(a1, b1, level + 1, cache);
        var groupMatch = group(aMatch, bMatch, level + 1, cache);
        var group2 = group(a2, b2, level + 1, cache);
        var result = groupMatch;
        if (bm.indexA > 0 || bm.indexB > 0) {
            result = group1.concat(result);
        }
        if (a.length > tailA || b.length > tailB) {
            result = result.concat(group2);
        }
        return result;
    }
    return group;
}
//# sourceMappingURL=rematch.js.map
;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/render-utils.js
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var CSSLineClass = {
    INSERTS: 'd2h-ins',
    DELETES: 'd2h-del',
    CONTEXT: 'd2h-cntx',
    INFO: 'd2h-info',
    INSERT_CHANGES: 'd2h-ins d2h-change',
    DELETE_CHANGES: 'd2h-del d2h-change',
};
var defaultRenderConfig = {
    matching: LineMatchingType.NONE,
    matchWordsThreshold: 0.25,
    maxLineLengthHighlight: 10000,
    diffStyle: DiffStyleType.WORD,
};
var separator = '/';
var distance = newDistanceFn(function (change) { return change.value; });
var matcher = newMatcherFn(distance);
function isDevNullName(name) {
    return name.indexOf('dev/null') !== -1;
}
function removeInsElements(line) {
    return line.replace(/(<ins[^>]*>((.|\n)*?)<\/ins>)/g, '');
}
function removeDelElements(line) {
    return line.replace(/(<del[^>]*>((.|\n)*?)<\/del>)/g, '');
}
function toCSSClass(lineType) {
    switch (lineType) {
        case LineType.CONTEXT:
            return CSSLineClass.CONTEXT;
        case LineType.INSERT:
            return CSSLineClass.INSERTS;
        case LineType.DELETE:
            return CSSLineClass.DELETES;
    }
}
function prefixLength(isCombined) {
    return isCombined ? 2 : 1;
}
function escapeForHtml(str) {
    return str
        .slice(0)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}
function deconstructLine(line, isCombined, escape) {
    if (escape === void 0) { escape = true; }
    var indexToSplit = prefixLength(isCombined);
    return {
        prefix: line.substring(0, indexToSplit),
        content: escape ? escapeForHtml(line.substring(indexToSplit)) : line.substring(indexToSplit),
    };
}
function filenameDiff(file) {
    var oldFilename = unifyPath(file.oldName);
    var newFilename = unifyPath(file.newName);
    if (oldFilename !== newFilename && !isDevNullName(oldFilename) && !isDevNullName(newFilename)) {
        var prefixPaths = [];
        var suffixPaths = [];
        var oldFilenameParts = oldFilename.split(separator);
        var newFilenameParts = newFilename.split(separator);
        var oldFilenamePartsSize = oldFilenameParts.length;
        var newFilenamePartsSize = newFilenameParts.length;
        var i = 0;
        var j = oldFilenamePartsSize - 1;
        var k = newFilenamePartsSize - 1;
        while (i < j && i < k) {
            if (oldFilenameParts[i] === newFilenameParts[i]) {
                prefixPaths.push(newFilenameParts[i]);
                i += 1;
            }
            else {
                break;
            }
        }
        while (j > i && k > i) {
            if (oldFilenameParts[j] === newFilenameParts[k]) {
                suffixPaths.unshift(newFilenameParts[k]);
                j -= 1;
                k -= 1;
            }
            else {
                break;
            }
        }
        var finalPrefix = prefixPaths.join(separator);
        var finalSuffix = suffixPaths.join(separator);
        var oldRemainingPath = oldFilenameParts.slice(i, j + 1).join(separator);
        var newRemainingPath = newFilenameParts.slice(i, k + 1).join(separator);
        if (finalPrefix.length && finalSuffix.length) {
            return (finalPrefix + separator + '{' + oldRemainingPath + ' → ' + newRemainingPath + '}' + separator + finalSuffix);
        }
        else if (finalPrefix.length) {
            return finalPrefix + separator + '{' + oldRemainingPath + ' → ' + newRemainingPath + '}';
        }
        else if (finalSuffix.length) {
            return '{' + oldRemainingPath + ' → ' + newRemainingPath + '}' + separator + finalSuffix;
        }
        return oldFilename + ' → ' + newFilename;
    }
    else if (!isDevNullName(newFilename)) {
        return newFilename;
    }
    else {
        return oldFilename;
    }
}
function getHtmlId(file) {
    return "d2h-".concat(hashCode(filenameDiff(file)).toString().slice(-6));
}
function getFileIcon(file) {
    var templateName = 'file-changed';
    if (file.isRename) {
        templateName = 'file-renamed';
    }
    else if (file.isCopy) {
        templateName = 'file-renamed';
    }
    else if (file.isNew) {
        templateName = 'file-added';
    }
    else if (file.isDeleted) {
        templateName = 'file-deleted';
    }
    else if (file.newName !== file.oldName) {
        templateName = 'file-renamed';
    }
    return templateName;
}
function diffHighlight(diffLine1, diffLine2, isCombined, config) {
    if (config === void 0) { config = {}; }
    var _a = __assign(__assign({}, defaultRenderConfig), config), matching = _a.matching, maxLineLengthHighlight = _a.maxLineLengthHighlight, matchWordsThreshold = _a.matchWordsThreshold, diffStyle = _a.diffStyle;
    var line1 = deconstructLine(diffLine1, isCombined, false);
    var line2 = deconstructLine(diffLine2, isCombined, false);
    if (line1.content.length > maxLineLengthHighlight || line2.content.length > maxLineLengthHighlight) {
        return {
            oldLine: {
                prefix: line1.prefix,
                content: escapeForHtml(line1.content),
            },
            newLine: {
                prefix: line2.prefix,
                content: escapeForHtml(line2.content),
            },
        };
    }
    var diff = diffStyle === 'char'
        ? diffChars(line1.content, line2.content)
        : diffWordsWithSpace(line1.content, line2.content);
    var changedWords = [];
    if (diffStyle === 'word' && matching === 'words') {
        var removed = diff.filter(function (element) { return element.removed; });
        var added = diff.filter(function (element) { return element.added; });
        var chunks = matcher(added, removed);
        chunks.forEach(function (chunk) {
            if (chunk[0].length === 1 && chunk[1].length === 1) {
                var dist = distance(chunk[0][0], chunk[1][0]);
                if (dist < matchWordsThreshold) {
                    changedWords.push(chunk[0][0]);
                    changedWords.push(chunk[1][0]);
                }
            }
        });
    }
    var highlightedLine = diff.reduce(function (highlightedLine, part) {
        var elemType = part.added ? 'ins' : part.removed ? 'del' : null;
        var addClass = changedWords.indexOf(part) > -1 ? ' class="d2h-change"' : '';
        var escapedValue = escapeForHtml(part.value);
        return elemType !== null
            ? "".concat(highlightedLine, "<").concat(elemType).concat(addClass, ">").concat(escapedValue, "</").concat(elemType, ">")
            : "".concat(highlightedLine).concat(escapedValue);
    }, '');
    return {
        oldLine: {
            prefix: line1.prefix,
            content: removeInsElements(highlightedLine),
        },
        newLine: {
            prefix: line2.prefix,
            content: removeDelElements(highlightedLine),
        },
    };
}
//# sourceMappingURL=render-utils.js.map
;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/file-list-renderer.js

var baseTemplatesPath = 'file-summary';
var iconsBaseTemplatesPath = 'icon';
function render(diffFiles, hoganUtils) {
    var files = diffFiles
        .map(function (file) {
        return hoganUtils.render(baseTemplatesPath, 'line', {
            fileHtmlId: getHtmlId(file),
            oldName: file.oldName,
            newName: file.newName,
            fileName: filenameDiff(file),
            deletedLines: '-' + file.deletedLines,
            addedLines: '+' + file.addedLines,
        }, {
            fileIcon: hoganUtils.template(iconsBaseTemplatesPath, getFileIcon(file)),
        });
    })
        .join('\n');
    return hoganUtils.render(baseTemplatesPath, 'wrapper', {
        filesNumber: diffFiles.length,
        files: files,
    });
}
//# sourceMappingURL=file-list-renderer.js.map
;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/line-by-line-renderer.js
var line_by_line_renderer_assign = (undefined && undefined.__assign) || function () {
    line_by_line_renderer_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return line_by_line_renderer_assign.apply(this, arguments);
};



var defaultLineByLineRendererConfig = line_by_line_renderer_assign(line_by_line_renderer_assign({}, defaultRenderConfig), { renderNothingWhenEmpty: false, matchingMaxComparisons: 2500, maxLineSizeInBlockForComparison: 200 });
var genericTemplatesPath = 'generic';
var line_by_line_renderer_baseTemplatesPath = 'line-by-line';
var line_by_line_renderer_iconsBaseTemplatesPath = 'icon';
var tagsBaseTemplatesPath = 'tag';
var LineByLineRenderer = (function () {
    function LineByLineRenderer(hoganUtils, config) {
        if (config === void 0) { config = {}; }
        this.hoganUtils = hoganUtils;
        this.config = line_by_line_renderer_assign(line_by_line_renderer_assign({}, defaultLineByLineRendererConfig), config);
    }
    LineByLineRenderer.prototype.render = function (diffFiles) {
        var _this = this;
        var diffsHtml = diffFiles
            .map(function (file) {
            var diffs;
            if (file.blocks.length) {
                diffs = _this.generateFileHtml(file);
            }
            else {
                diffs = _this.generateEmptyDiff();
            }
            return _this.makeFileDiffHtml(file, diffs);
        })
            .join('\n');
        return this.hoganUtils.render(genericTemplatesPath, 'wrapper', { content: diffsHtml });
    };
    LineByLineRenderer.prototype.makeFileDiffHtml = function (file, diffs) {
        if (this.config.renderNothingWhenEmpty && Array.isArray(file.blocks) && file.blocks.length === 0)
            return '';
        var fileDiffTemplate = this.hoganUtils.template(line_by_line_renderer_baseTemplatesPath, 'file-diff');
        var filePathTemplate = this.hoganUtils.template(genericTemplatesPath, 'file-path');
        var fileIconTemplate = this.hoganUtils.template(line_by_line_renderer_iconsBaseTemplatesPath, 'file');
        var fileTagTemplate = this.hoganUtils.template(tagsBaseTemplatesPath, getFileIcon(file));
        return fileDiffTemplate.render({
            file: file,
            fileHtmlId: getHtmlId(file),
            diffs: diffs,
            filePath: filePathTemplate.render({
                fileDiffName: filenameDiff(file),
            }, {
                fileIcon: fileIconTemplate,
                fileTag: fileTagTemplate,
            }),
        });
    };
    LineByLineRenderer.prototype.generateEmptyDiff = function () {
        return this.hoganUtils.render(genericTemplatesPath, 'empty-diff', {
            contentClass: 'd2h-code-line',
            CSSLineClass: CSSLineClass,
        });
    };
    LineByLineRenderer.prototype.generateFileHtml = function (file) {
        var _this = this;
        var matcher = newMatcherFn(newDistanceFn(function (e) { return deconstructLine(e.content, file.isCombined).content; }));
        return file.blocks
            .map(function (block) {
            var lines = _this.hoganUtils.render(genericTemplatesPath, 'block-header', {
                CSSLineClass: CSSLineClass,
                blockHeader: file.isTooBig ? block.header : escapeForHtml(block.header),
                lineClass: 'd2h-code-linenumber',
                contentClass: 'd2h-code-line',
            });
            _this.applyLineGroupping(block).forEach(function (_a) {
                var contextLines = _a[0], oldLines = _a[1], newLines = _a[2];
                if (oldLines.length && newLines.length && !contextLines.length) {
                    _this.applyRematchMatching(oldLines, newLines, matcher).map(function (_a) {
                        var oldLines = _a[0], newLines = _a[1];
                        var _b = _this.processChangedLines(file.isCombined, oldLines, newLines), left = _b.left, right = _b.right;
                        lines += left;
                        lines += right;
                    });
                }
                else if (contextLines.length) {
                    contextLines.forEach(function (line) {
                        var _a = deconstructLine(line.content, file.isCombined), prefix = _a.prefix, content = _a.content;
                        lines += _this.generateSingleLineHtml({
                            type: CSSLineClass.CONTEXT,
                            prefix: prefix,
                            content: content,
                            oldNumber: line.oldNumber,
                            newNumber: line.newNumber,
                        });
                    });
                }
                else if (oldLines.length || newLines.length) {
                    var _b = _this.processChangedLines(file.isCombined, oldLines, newLines), left = _b.left, right = _b.right;
                    lines += left;
                    lines += right;
                }
                else {
                    console.error('Unknown state reached while processing groups of lines', contextLines, oldLines, newLines);
                }
            });
            return lines;
        })
            .join('\n');
    };
    LineByLineRenderer.prototype.applyLineGroupping = function (block) {
        var blockLinesGroups = [];
        var oldLines = [];
        var newLines = [];
        for (var i = 0; i < block.lines.length; i++) {
            var diffLine = block.lines[i];
            if ((diffLine.type !== LineType.INSERT && newLines.length) ||
                (diffLine.type === LineType.CONTEXT && oldLines.length > 0)) {
                blockLinesGroups.push([[], oldLines, newLines]);
                oldLines = [];
                newLines = [];
            }
            if (diffLine.type === LineType.CONTEXT) {
                blockLinesGroups.push([[diffLine], [], []]);
            }
            else if (diffLine.type === LineType.INSERT && oldLines.length === 0) {
                blockLinesGroups.push([[], [], [diffLine]]);
            }
            else if (diffLine.type === LineType.INSERT && oldLines.length > 0) {
                newLines.push(diffLine);
            }
            else if (diffLine.type === LineType.DELETE) {
                oldLines.push(diffLine);
            }
        }
        if (oldLines.length || newLines.length) {
            blockLinesGroups.push([[], oldLines, newLines]);
            oldLines = [];
            newLines = [];
        }
        return blockLinesGroups;
    };
    LineByLineRenderer.prototype.applyRematchMatching = function (oldLines, newLines, matcher) {
        var comparisons = oldLines.length * newLines.length;
        var maxLineSizeInBlock = Math.max.apply(null, [0].concat(oldLines.concat(newLines).map(function (elem) { return elem.content.length; })));
        var doMatching = comparisons < this.config.matchingMaxComparisons &&
            maxLineSizeInBlock < this.config.maxLineSizeInBlockForComparison &&
            (this.config.matching === 'lines' || this.config.matching === 'words');
        return doMatching ? matcher(oldLines, newLines) : [[oldLines, newLines]];
    };
    LineByLineRenderer.prototype.processChangedLines = function (isCombined, oldLines, newLines) {
        var fileHtml = {
            right: '',
            left: '',
        };
        var maxLinesNumber = Math.max(oldLines.length, newLines.length);
        for (var i = 0; i < maxLinesNumber; i++) {
            var oldLine = oldLines[i];
            var newLine = newLines[i];
            var diff = oldLine !== undefined && newLine !== undefined
                ? diffHighlight(oldLine.content, newLine.content, isCombined, this.config)
                : undefined;
            var preparedOldLine = oldLine !== undefined && oldLine.oldNumber !== undefined
                ? line_by_line_renderer_assign(line_by_line_renderer_assign({}, (diff !== undefined
                    ? {
                        prefix: diff.oldLine.prefix,
                        content: diff.oldLine.content,
                        type: CSSLineClass.DELETE_CHANGES,
                    }
                    : line_by_line_renderer_assign(line_by_line_renderer_assign({}, deconstructLine(oldLine.content, isCombined)), { type: toCSSClass(oldLine.type) }))), { oldNumber: oldLine.oldNumber, newNumber: oldLine.newNumber }) : undefined;
            var preparedNewLine = newLine !== undefined && newLine.newNumber !== undefined
                ? line_by_line_renderer_assign(line_by_line_renderer_assign({}, (diff !== undefined
                    ? {
                        prefix: diff.newLine.prefix,
                        content: diff.newLine.content,
                        type: CSSLineClass.INSERT_CHANGES,
                    }
                    : line_by_line_renderer_assign(line_by_line_renderer_assign({}, deconstructLine(newLine.content, isCombined)), { type: toCSSClass(newLine.type) }))), { oldNumber: newLine.oldNumber, newNumber: newLine.newNumber }) : undefined;
            var _a = this.generateLineHtml(preparedOldLine, preparedNewLine), left = _a.left, right = _a.right;
            fileHtml.left += left;
            fileHtml.right += right;
        }
        return fileHtml;
    };
    LineByLineRenderer.prototype.generateLineHtml = function (oldLine, newLine) {
        return {
            left: this.generateSingleLineHtml(oldLine),
            right: this.generateSingleLineHtml(newLine),
        };
    };
    LineByLineRenderer.prototype.generateSingleLineHtml = function (line) {
        if (line === undefined)
            return '';
        var lineNumberHtml = this.hoganUtils.render(line_by_line_renderer_baseTemplatesPath, 'numbers', {
            oldNumber: line.oldNumber || '',
            newNumber: line.newNumber || '',
        });
        return this.hoganUtils.render(genericTemplatesPath, 'line', {
            type: line.type,
            lineClass: 'd2h-code-linenumber',
            contentClass: 'd2h-code-line',
            prefix: line.prefix === ' ' ? '&nbsp;' : line.prefix,
            content: line.content,
            lineNumber: lineNumberHtml,
        });
    };
    return LineByLineRenderer;
}());
/* harmony default export */ const line_by_line_renderer = (LineByLineRenderer);
//# sourceMappingURL=line-by-line-renderer.js.map
;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/side-by-side-renderer.js
var side_by_side_renderer_assign = (undefined && undefined.__assign) || function () {
    side_by_side_renderer_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return side_by_side_renderer_assign.apply(this, arguments);
};



var defaultSideBySideRendererConfig = side_by_side_renderer_assign(side_by_side_renderer_assign({}, defaultRenderConfig), { renderNothingWhenEmpty: false, matchingMaxComparisons: 2500, maxLineSizeInBlockForComparison: 200 });
var side_by_side_renderer_genericTemplatesPath = 'generic';
var side_by_side_renderer_baseTemplatesPath = 'side-by-side';
var side_by_side_renderer_iconsBaseTemplatesPath = 'icon';
var side_by_side_renderer_tagsBaseTemplatesPath = 'tag';
var SideBySideRenderer = (function () {
    function SideBySideRenderer(hoganUtils, config) {
        if (config === void 0) { config = {}; }
        this.hoganUtils = hoganUtils;
        this.config = side_by_side_renderer_assign(side_by_side_renderer_assign({}, defaultSideBySideRendererConfig), config);
    }
    SideBySideRenderer.prototype.render = function (diffFiles) {
        var _this = this;
        var diffsHtml = diffFiles
            .map(function (file) {
            var diffs;
            if (file.blocks.length) {
                diffs = _this.generateFileHtml(file);
            }
            else {
                diffs = _this.generateEmptyDiff();
            }
            return _this.makeFileDiffHtml(file, diffs);
        })
            .join('\n');
        return this.hoganUtils.render(side_by_side_renderer_genericTemplatesPath, 'wrapper', { content: diffsHtml });
    };
    SideBySideRenderer.prototype.makeFileDiffHtml = function (file, diffs) {
        if (this.config.renderNothingWhenEmpty && Array.isArray(file.blocks) && file.blocks.length === 0)
            return '';
        var fileDiffTemplate = this.hoganUtils.template(side_by_side_renderer_baseTemplatesPath, 'file-diff');
        var filePathTemplate = this.hoganUtils.template(side_by_side_renderer_genericTemplatesPath, 'file-path');
        var fileIconTemplate = this.hoganUtils.template(side_by_side_renderer_iconsBaseTemplatesPath, 'file');
        var fileTagTemplate = this.hoganUtils.template(side_by_side_renderer_tagsBaseTemplatesPath, getFileIcon(file));
        return fileDiffTemplate.render({
            file: file,
            fileHtmlId: getHtmlId(file),
            diffs: diffs,
            filePath: filePathTemplate.render({
                fileDiffName: filenameDiff(file),
            }, {
                fileIcon: fileIconTemplate,
                fileTag: fileTagTemplate,
            }),
        });
    };
    SideBySideRenderer.prototype.generateEmptyDiff = function () {
        return {
            right: '',
            left: this.hoganUtils.render(side_by_side_renderer_genericTemplatesPath, 'empty-diff', {
                contentClass: 'd2h-code-side-line',
                CSSLineClass: CSSLineClass,
            }),
        };
    };
    SideBySideRenderer.prototype.generateFileHtml = function (file) {
        var _this = this;
        var matcher = newMatcherFn(newDistanceFn(function (e) { return deconstructLine(e.content, file.isCombined).content; }));
        return file.blocks
            .map(function (block) {
            var fileHtml = {
                left: _this.makeHeaderHtml(block.header, file),
                right: _this.makeHeaderHtml(''),
            };
            _this.applyLineGroupping(block).forEach(function (_a) {
                var contextLines = _a[0], oldLines = _a[1], newLines = _a[2];
                if (oldLines.length && newLines.length && !contextLines.length) {
                    _this.applyRematchMatching(oldLines, newLines, matcher).map(function (_a) {
                        var oldLines = _a[0], newLines = _a[1];
                        var _b = _this.processChangedLines(file.isCombined, oldLines, newLines), left = _b.left, right = _b.right;
                        fileHtml.left += left;
                        fileHtml.right += right;
                    });
                }
                else if (contextLines.length) {
                    contextLines.forEach(function (line) {
                        var _a = deconstructLine(line.content, file.isCombined), prefix = _a.prefix, content = _a.content;
                        var _b = _this.generateLineHtml({
                            type: CSSLineClass.CONTEXT,
                            prefix: prefix,
                            content: content,
                            number: line.oldNumber,
                        }, {
                            type: CSSLineClass.CONTEXT,
                            prefix: prefix,
                            content: content,
                            number: line.newNumber,
                        }), left = _b.left, right = _b.right;
                        fileHtml.left += left;
                        fileHtml.right += right;
                    });
                }
                else if (oldLines.length || newLines.length) {
                    var _b = _this.processChangedLines(file.isCombined, oldLines, newLines), left = _b.left, right = _b.right;
                    fileHtml.left += left;
                    fileHtml.right += right;
                }
                else {
                    console.error('Unknown state reached while processing groups of lines', contextLines, oldLines, newLines);
                }
            });
            return fileHtml;
        })
            .reduce(function (accomulated, html) {
            return { left: accomulated.left + html.left, right: accomulated.right + html.right };
        }, { left: '', right: '' });
    };
    SideBySideRenderer.prototype.applyLineGroupping = function (block) {
        var blockLinesGroups = [];
        var oldLines = [];
        var newLines = [];
        for (var i = 0; i < block.lines.length; i++) {
            var diffLine = block.lines[i];
            if ((diffLine.type !== LineType.INSERT && newLines.length) ||
                (diffLine.type === LineType.CONTEXT && oldLines.length > 0)) {
                blockLinesGroups.push([[], oldLines, newLines]);
                oldLines = [];
                newLines = [];
            }
            if (diffLine.type === LineType.CONTEXT) {
                blockLinesGroups.push([[diffLine], [], []]);
            }
            else if (diffLine.type === LineType.INSERT && oldLines.length === 0) {
                blockLinesGroups.push([[], [], [diffLine]]);
            }
            else if (diffLine.type === LineType.INSERT && oldLines.length > 0) {
                newLines.push(diffLine);
            }
            else if (diffLine.type === LineType.DELETE) {
                oldLines.push(diffLine);
            }
        }
        if (oldLines.length || newLines.length) {
            blockLinesGroups.push([[], oldLines, newLines]);
            oldLines = [];
            newLines = [];
        }
        return blockLinesGroups;
    };
    SideBySideRenderer.prototype.applyRematchMatching = function (oldLines, newLines, matcher) {
        var comparisons = oldLines.length * newLines.length;
        var maxLineSizeInBlock = Math.max.apply(null, [0].concat(oldLines.concat(newLines).map(function (elem) { return elem.content.length; })));
        var doMatching = comparisons < this.config.matchingMaxComparisons &&
            maxLineSizeInBlock < this.config.maxLineSizeInBlockForComparison &&
            (this.config.matching === 'lines' || this.config.matching === 'words');
        return doMatching ? matcher(oldLines, newLines) : [[oldLines, newLines]];
    };
    SideBySideRenderer.prototype.makeHeaderHtml = function (blockHeader, file) {
        return this.hoganUtils.render(side_by_side_renderer_genericTemplatesPath, 'block-header', {
            CSSLineClass: CSSLineClass,
            blockHeader: (file === null || file === void 0 ? void 0 : file.isTooBig) ? blockHeader : escapeForHtml(blockHeader),
            lineClass: 'd2h-code-side-linenumber',
            contentClass: 'd2h-code-side-line',
        });
    };
    SideBySideRenderer.prototype.processChangedLines = function (isCombined, oldLines, newLines) {
        var fileHtml = {
            right: '',
            left: '',
        };
        var maxLinesNumber = Math.max(oldLines.length, newLines.length);
        for (var i = 0; i < maxLinesNumber; i++) {
            var oldLine = oldLines[i];
            var newLine = newLines[i];
            var diff = oldLine !== undefined && newLine !== undefined
                ? diffHighlight(oldLine.content, newLine.content, isCombined, this.config)
                : undefined;
            var preparedOldLine = oldLine !== undefined && oldLine.oldNumber !== undefined
                ? side_by_side_renderer_assign(side_by_side_renderer_assign({}, (diff !== undefined
                    ? {
                        prefix: diff.oldLine.prefix,
                        content: diff.oldLine.content,
                        type: CSSLineClass.DELETE_CHANGES,
                    }
                    : side_by_side_renderer_assign(side_by_side_renderer_assign({}, deconstructLine(oldLine.content, isCombined)), { type: toCSSClass(oldLine.type) }))), { number: oldLine.oldNumber }) : undefined;
            var preparedNewLine = newLine !== undefined && newLine.newNumber !== undefined
                ? side_by_side_renderer_assign(side_by_side_renderer_assign({}, (diff !== undefined
                    ? {
                        prefix: diff.newLine.prefix,
                        content: diff.newLine.content,
                        type: CSSLineClass.INSERT_CHANGES,
                    }
                    : side_by_side_renderer_assign(side_by_side_renderer_assign({}, deconstructLine(newLine.content, isCombined)), { type: toCSSClass(newLine.type) }))), { number: newLine.newNumber }) : undefined;
            var _a = this.generateLineHtml(preparedOldLine, preparedNewLine), left = _a.left, right = _a.right;
            fileHtml.left += left;
            fileHtml.right += right;
        }
        return fileHtml;
    };
    SideBySideRenderer.prototype.generateLineHtml = function (oldLine, newLine) {
        return {
            left: this.generateSingleHtml(oldLine),
            right: this.generateSingleHtml(newLine),
        };
    };
    SideBySideRenderer.prototype.generateSingleHtml = function (line) {
        var lineClass = 'd2h-code-side-linenumber';
        var contentClass = 'd2h-code-side-line';
        return this.hoganUtils.render(side_by_side_renderer_genericTemplatesPath, 'line', {
            type: (line === null || line === void 0 ? void 0 : line.type) || "".concat(CSSLineClass.CONTEXT, " d2h-emptyplaceholder"),
            lineClass: line !== undefined ? lineClass : "".concat(lineClass, " d2h-code-side-emptyplaceholder"),
            contentClass: line !== undefined ? contentClass : "".concat(contentClass, " d2h-code-side-emptyplaceholder"),
            prefix: (line === null || line === void 0 ? void 0 : line.prefix) === ' ' ? '&nbsp;' : line === null || line === void 0 ? void 0 : line.prefix,
            content: line === null || line === void 0 ? void 0 : line.content,
            lineNumber: line === null || line === void 0 ? void 0 : line.number,
        });
    };
    return SideBySideRenderer;
}());
/* harmony default export */ const side_by_side_renderer = (SideBySideRenderer);
//# sourceMappingURL=side-by-side-renderer.js.map
// EXTERNAL MODULE: ./node_modules/hogan.js/lib/hogan.js
var hogan = __webpack_require__(485);
;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/diff2html-templates.js

var defaultTemplates = {};
defaultTemplates["file-summary-line"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<li class=\"d2h-file-list-line\">"); t.b("\n" + i); t.b("    <span class=\"d2h-file-name-wrapper\">"); t.b("\n" + i); t.b(t.rp("<fileIcon0", c, p, "      ")); t.b("      <a href=\"#"); t.b(t.v(t.f("fileHtmlId", c, p, 0))); t.b("\" class=\"d2h-file-name\">"); t.b(t.v(t.f("fileName", c, p, 0))); t.b("</a>"); t.b("\n" + i); t.b("      <span class=\"d2h-file-stats\">"); t.b("\n" + i); t.b("          <span class=\"d2h-lines-added\">"); t.b(t.v(t.f("addedLines", c, p, 0))); t.b("</span>"); t.b("\n" + i); t.b("          <span class=\"d2h-lines-deleted\">"); t.b(t.v(t.f("deletedLines", c, p, 0))); t.b("</span>"); t.b("\n" + i); t.b("      </span>"); t.b("\n" + i); t.b("    </span>"); t.b("\n" + i); t.b("</li>"); return t.fl(); }, partials: { "<fileIcon0": { name: "fileIcon", partials: {}, subs: {} } }, subs: {} });
defaultTemplates["file-summary-wrapper"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div class=\"d2h-file-list-wrapper\">"); t.b("\n" + i); t.b("    <div class=\"d2h-file-list-header\">"); t.b("\n" + i); t.b("        <span class=\"d2h-file-list-title\">Files changed ("); t.b(t.v(t.f("filesNumber", c, p, 0))); t.b(")</span>"); t.b("\n" + i); t.b("        <a class=\"d2h-file-switch d2h-hide\">hide</a>"); t.b("\n" + i); t.b("        <a class=\"d2h-file-switch d2h-show\">show</a>"); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("    <ol class=\"d2h-file-list\">"); t.b("\n" + i); t.b("    "); t.b(t.t(t.f("files", c, p, 0))); t.b("\n" + i); t.b("    </ol>"); t.b("\n" + i); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["generic-block-header"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<tr>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.f("lineClass", c, p, 0))); t.b(" "); t.b(t.v(t.d("CSSLineClass.INFO", c, p, 0))); t.b("\"></td>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.d("CSSLineClass.INFO", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("        <div class=\""); t.b(t.v(t.f("contentClass", c, p, 0))); t.b("\">"); t.b(t.t(t.f("blockHeader", c, p, 0))); t.b("</div>"); t.b("\n" + i); t.b("    </td>"); t.b("\n" + i); t.b("</tr>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["generic-empty-diff"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<tr>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.d("CSSLineClass.INFO", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("        <div class=\""); t.b(t.v(t.f("contentClass", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("            File without changes"); t.b("\n" + i); t.b("        </div>"); t.b("\n" + i); t.b("    </td>"); t.b("\n" + i); t.b("</tr>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["generic-file-path"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-file-name-wrapper\">"); t.b("\n" + i); t.b(t.rp("<fileIcon0", c, p, "    ")); t.b("    <span class=\"d2h-file-name\">"); t.b(t.v(t.f("fileDiffName", c, p, 0))); t.b("</span>"); t.b("\n" + i); t.b(t.rp("<fileTag1", c, p, "    ")); t.b("</span>"); t.b("\n" + i); t.b("<label class=\"d2h-file-collapse\">"); t.b("\n" + i); t.b("    <input class=\"d2h-file-collapse-input\" type=\"checkbox\" name=\"viewed\" value=\"viewed\">"); t.b("\n" + i); t.b("    Viewed"); t.b("\n" + i); t.b("</label>"); return t.fl(); }, partials: { "<fileIcon0": { name: "fileIcon", partials: {}, subs: {} }, "<fileTag1": { name: "fileTag", partials: {}, subs: {} } }, subs: {} });
defaultTemplates["generic-line"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<tr>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.f("lineClass", c, p, 0))); t.b(" "); t.b(t.v(t.f("type", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("      "); t.b(t.t(t.f("lineNumber", c, p, 0))); t.b("\n" + i); t.b("    </td>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.f("type", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("        <div class=\""); t.b(t.v(t.f("contentClass", c, p, 0))); t.b("\">"); t.b("\n" + i); if (t.s(t.f("prefix", c, p, 1), c, p, 0, 162, 238, "{{ }}")) {
        t.rs(c, p, function (c, p, t) { t.b("            <span class=\"d2h-code-line-prefix\">"); t.b(t.t(t.f("prefix", c, p, 0))); t.b("</span>"); t.b("\n" + i); });
        c.pop();
    } if (!t.s(t.f("prefix", c, p, 1), c, p, 1, 0, 0, "")) {
        t.b("            <span class=\"d2h-code-line-prefix\">&nbsp;</span>");
        t.b("\n" + i);
    } ; if (t.s(t.f("content", c, p, 1), c, p, 0, 371, 445, "{{ }}")) {
        t.rs(c, p, function (c, p, t) { t.b("            <span class=\"d2h-code-line-ctn\">"); t.b(t.t(t.f("content", c, p, 0))); t.b("</span>"); t.b("\n" + i); });
        c.pop();
    } if (!t.s(t.f("content", c, p, 1), c, p, 1, 0, 0, "")) {
        t.b("            <span class=\"d2h-code-line-ctn\"><br></span>");
        t.b("\n" + i);
    } ; t.b("        </div>"); t.b("\n" + i); t.b("    </td>"); t.b("\n" + i); t.b("</tr>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["generic-wrapper"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div class=\"d2h-wrapper\">"); t.b("\n" + i); t.b("    "); t.b(t.t(t.f("content", c, p, 0))); t.b("\n" + i); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file-added"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-added\" height=\"16\" title=\"added\" version=\"1.1\" viewBox=\"0 0 14 16\""); t.b("\n" + i); t.b("     width=\"14\">"); t.b("\n" + i); t.b("    <path d=\"M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file-changed"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-changed\" height=\"16\" title=\"modified\" version=\"1.1\""); t.b("\n" + i); t.b("     viewBox=\"0 0 14 16\" width=\"14\">"); t.b("\n" + i); t.b("    <path d=\"M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file-deleted"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-deleted\" height=\"16\" title=\"removed\" version=\"1.1\""); t.b("\n" + i); t.b("     viewBox=\"0 0 14 16\" width=\"14\">"); t.b("\n" + i); t.b("    <path d=\"M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM11 9H3V7h8v2z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file-renamed"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-moved\" height=\"16\" title=\"renamed\" version=\"1.1\""); t.b("\n" + i); t.b("     viewBox=\"0 0 14 16\" width=\"14\">"); t.b("\n" + i); t.b("    <path d=\"M6 9H3V7h3V4l5 4-5 4V9z m8-7v12c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h12c0.55 0 1 0.45 1 1z m-1 0H1v12h12V2z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon\" height=\"16\" version=\"1.1\" viewBox=\"0 0 12 16\" width=\"12\">"); t.b("\n" + i); t.b("    <path d=\"M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["line-by-line-file-diff"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div id=\""); t.b(t.v(t.f("fileHtmlId", c, p, 0))); t.b("\" class=\"d2h-file-wrapper\" data-lang=\""); t.b(t.v(t.d("file.language", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("    <div class=\"d2h-file-header\">"); t.b("\n" + i); t.b("    "); t.b(t.t(t.f("filePath", c, p, 0))); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("    <div class=\"d2h-file-diff\">"); t.b("\n" + i); t.b("        <div class=\"d2h-code-wrapper\">"); t.b("\n" + i); t.b("            <table class=\"d2h-diff-table\">"); t.b("\n" + i); t.b("                <tbody class=\"d2h-diff-tbody\">"); t.b("\n" + i); t.b("                "); t.b(t.t(t.f("diffs", c, p, 0))); t.b("\n" + i); t.b("                </tbody>"); t.b("\n" + i); t.b("            </table>"); t.b("\n" + i); t.b("        </div>"); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["line-by-line-numbers"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div class=\"line-num1\">"); t.b(t.v(t.f("oldNumber", c, p, 0))); t.b("</div>"); t.b("\n" + i); t.b("<div class=\"line-num2\">"); t.b(t.v(t.f("newNumber", c, p, 0))); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["side-by-side-file-diff"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div id=\""); t.b(t.v(t.f("fileHtmlId", c, p, 0))); t.b("\" class=\"d2h-file-wrapper\" data-lang=\""); t.b(t.v(t.d("file.language", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("    <div class=\"d2h-file-header\">"); t.b("\n" + i); t.b("      "); t.b(t.t(t.f("filePath", c, p, 0))); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("    <div class=\"d2h-files-diff\">"); t.b("\n" + i); t.b("        <div class=\"d2h-file-side-diff\">"); t.b("\n" + i); t.b("            <div class=\"d2h-code-wrapper\">"); t.b("\n" + i); t.b("                <table class=\"d2h-diff-table\">"); t.b("\n" + i); t.b("                    <tbody class=\"d2h-diff-tbody\">"); t.b("\n" + i); t.b("                    "); t.b(t.t(t.d("diffs.left", c, p, 0))); t.b("\n" + i); t.b("                    </tbody>"); t.b("\n" + i); t.b("                </table>"); t.b("\n" + i); t.b("            </div>"); t.b("\n" + i); t.b("        </div>"); t.b("\n" + i); t.b("        <div class=\"d2h-file-side-diff\">"); t.b("\n" + i); t.b("            <div class=\"d2h-code-wrapper\">"); t.b("\n" + i); t.b("                <table class=\"d2h-diff-table\">"); t.b("\n" + i); t.b("                    <tbody class=\"d2h-diff-tbody\">"); t.b("\n" + i); t.b("                    "); t.b(t.t(t.d("diffs.right", c, p, 0))); t.b("\n" + i); t.b("                    </tbody>"); t.b("\n" + i); t.b("                </table>"); t.b("\n" + i); t.b("            </div>"); t.b("\n" + i); t.b("        </div>"); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["tag-file-added"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-tag d2h-added d2h-added-tag\">ADDED</span>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["tag-file-changed"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-tag d2h-changed d2h-changed-tag\">CHANGED</span>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["tag-file-deleted"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-tag d2h-deleted d2h-deleted-tag\">DELETED</span>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["tag-file-renamed"] = new hogan.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-tag d2h-moved d2h-moved-tag\">RENAMED</span>"); return t.fl(); }, partials: {}, subs: {} });
//# sourceMappingURL=diff2html-templates.js.map
;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/hoganjs-utils.js
var hoganjs_utils_assign = (undefined && undefined.__assign) || function () {
    hoganjs_utils_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return hoganjs_utils_assign.apply(this, arguments);
};


var HoganJsUtils = (function () {
    function HoganJsUtils(_a) {
        var _b = _a.compiledTemplates, compiledTemplates = _b === void 0 ? {} : _b, _c = _a.rawTemplates, rawTemplates = _c === void 0 ? {} : _c;
        var compiledRawTemplates = Object.entries(rawTemplates).reduce(function (previousTemplates, _a) {
            var _b;
            var name = _a[0], templateString = _a[1];
            var compiledTemplate = hogan.compile(templateString, { asString: false });
            return hoganjs_utils_assign(hoganjs_utils_assign({}, previousTemplates), (_b = {}, _b[name] = compiledTemplate, _b));
        }, {});
        this.preCompiledTemplates = hoganjs_utils_assign(hoganjs_utils_assign(hoganjs_utils_assign({}, defaultTemplates), compiledTemplates), compiledRawTemplates);
    }
    HoganJsUtils.compile = function (templateString) {
        return hogan.compile(templateString, { asString: false });
    };
    HoganJsUtils.prototype.render = function (namespace, view, params, partials, indent) {
        var templateKey = this.templateKey(namespace, view);
        try {
            var template = this.preCompiledTemplates[templateKey];
            return template.render(params, partials, indent);
        }
        catch (e) {
            throw new Error("Could not find template to render '".concat(templateKey, "'"));
        }
    };
    HoganJsUtils.prototype.template = function (namespace, view) {
        return this.preCompiledTemplates[this.templateKey(namespace, view)];
    };
    HoganJsUtils.prototype.templateKey = function (namespace, view) {
        return "".concat(namespace, "-").concat(view);
    };
    return HoganJsUtils;
}());
/* harmony default export */ const hoganjs_utils = (HoganJsUtils);
//# sourceMappingURL=hoganjs-utils.js.map
;// CONCATENATED MODULE: ./node_modules/diff2html/lib-esm/diff2html.js
var diff2html_assign = (undefined && undefined.__assign) || function () {
    diff2html_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return diff2html_assign.apply(this, arguments);
};






var defaultDiff2HtmlConfig = diff2html_assign(diff2html_assign(diff2html_assign({}, defaultLineByLineRendererConfig), defaultSideBySideRendererConfig), { outputFormat: OutputFormatType.LINE_BY_LINE, drawFileList: true });
function diff2html_parse(diffInput, configuration) {
    if (configuration === void 0) { configuration = {}; }
    return parse(diffInput, diff2html_assign(diff2html_assign({}, defaultDiff2HtmlConfig), configuration));
}
function html(diffInput, configuration) {
    if (configuration === void 0) { configuration = {}; }
    var config = diff2html_assign(diff2html_assign({}, defaultDiff2HtmlConfig), configuration);
    var diffJson = typeof diffInput === 'string' ? parse(diffInput, config) : diffInput;
    var hoganUtils = new hoganjs_utils(config);
    var fileList = config.drawFileList ? render(diffJson, hoganUtils) : '';
    var diffOutput = config.outputFormat === 'side-by-side'
        ? new side_by_side_renderer(hoganUtils, config).render(diffJson)
        : new line_by_line_renderer(hoganUtils, config).render(diffJson);
    return fileList + diffOutput;
}
//# sourceMappingURL=diff2html.js.map

/***/ }),

/***/ 730:
/***/ (() => {

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./src/components/accordion.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Default = {
  alwaysOpen: false,
  activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
  inactiveClasses: 'text-gray-500 dark:text-gray-400',
  onOpen: function onOpen() {},
  onClose: function onClose() {},
  onToggle: function onToggle() {}
};

var Accordion = /*#__PURE__*/function () {
  function Accordion() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Accordion);

    this._items = items;
    this._options = _objectSpread(_objectSpread({}, Default), options);

    this._init();
  }

  _createClass(Accordion, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      if (this._items.length) {
        // show accordion item based on click
        this._items.map(function (item) {
          if (item.active) {
            _this.open(item.id);
          }

          item.triggerEl.addEventListener('click', function () {
            _this.toggle(item.id);
          });
        });
      }
    }
  }, {
    key: "getItem",
    value: function getItem(id) {
      return this._items.filter(function (item) {
        return item.id === id;
      })[0];
    }
  }, {
    key: "open",
    value: function open(id) {
      var _this2 = this,
          _item$triggerEl$class,
          _item$triggerEl$class2;

      var item = this.getItem(id); // don't hide other accordions if always open

      if (!this._options.alwaysOpen) {
        this._items.map(function (i) {
          if (i !== item) {
            var _i$triggerEl$classLis, _i$triggerEl$classLis2;

            (_i$triggerEl$classLis = i.triggerEl.classList).remove.apply(_i$triggerEl$classLis, _toConsumableArray(_this2._options.activeClasses.split(" ")));

            (_i$triggerEl$classLis2 = i.triggerEl.classList).add.apply(_i$triggerEl$classLis2, _toConsumableArray(_this2._options.inactiveClasses.split(" ")));

            i.targetEl.classList.add('hidden');
            i.triggerEl.setAttribute('aria-expanded', false);
            i.active = false; // rotate icon if set

            if (i.iconEl) {
              i.iconEl.classList.remove('rotate-180');
            }
          }
        });
      } // show active item


      (_item$triggerEl$class = item.triggerEl.classList).add.apply(_item$triggerEl$class, _toConsumableArray(this._options.activeClasses.split(" ")));

      (_item$triggerEl$class2 = item.triggerEl.classList).remove.apply(_item$triggerEl$class2, _toConsumableArray(this._options.inactiveClasses.split(" ")));

      item.triggerEl.setAttribute('aria-expanded', true);
      item.targetEl.classList.remove('hidden');
      item.active = true; // rotate icon if set

      if (item.iconEl) {
        item.iconEl.classList.add('rotate-180');
      } // callback function


      this._options.onOpen(this, item);
    }
  }, {
    key: "toggle",
    value: function toggle(id) {
      var item = this.getItem(id);

      if (item.active) {
        this.close(id);
      } else {
        this.open(id);
      } // callback function


      this._options.onToggle(this, item);
    }
  }, {
    key: "close",
    value: function close(id) {
      var _item$triggerEl$class3, _item$triggerEl$class4;

      var item = this.getItem(id);

      (_item$triggerEl$class3 = item.triggerEl.classList).remove.apply(_item$triggerEl$class3, _toConsumableArray(this._options.activeClasses.split(" ")));

      (_item$triggerEl$class4 = item.triggerEl.classList).add.apply(_item$triggerEl$class4, _toConsumableArray(this._options.inactiveClasses.split(" ")));

      item.targetEl.classList.add('hidden');
      item.triggerEl.setAttribute('aria-expanded', false);
      item.active = false; // rotate icon if set

      if (item.iconEl) {
        item.iconEl.classList.remove('rotate-180');
      } // callback function


      this._options.onClose(this, item);
    }
  }]);

  return Accordion;
}();

window.Accordion = Accordion;

function initAccordion() {
  document.querySelectorAll('[data-accordion]').forEach(function (accordionEl) {
    var alwaysOpen = accordionEl.getAttribute('data-accordion');
    var activeClasses = accordionEl.getAttribute('data-active-classes');
    var inactiveClasses = accordionEl.getAttribute('data-inactive-classes');
    var items = [];
    accordionEl.querySelectorAll('[data-accordion-target]').forEach(function (el) {
      var item = {
        id: el.getAttribute('data-accordion-target'),
        triggerEl: el,
        targetEl: document.querySelector(el.getAttribute('data-accordion-target')),
        iconEl: el.querySelector('[data-accordion-icon]'),
        active: el.getAttribute('aria-expanded') === 'true' ? true : false
      };
      items.push(item);
    });
    new Accordion(items, {
      alwaysOpen: alwaysOpen === 'open' ? true : false,
      activeClasses: activeClasses ? activeClasses : Default.activeClasses,
      inactiveClasses: inactiveClasses ? inactiveClasses : Default.inactiveClasses
    });
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initAccordion();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initAccordion);
}

/* harmony default export */ const accordion = (Accordion);
;// CONCATENATED MODULE: ./src/components/collapse.js
function collapse_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function collapse_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? collapse_ownKeys(Object(source), !0).forEach(function (key) { collapse_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : collapse_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function collapse_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function collapse_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function collapse_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function collapse_createClass(Constructor, protoProps, staticProps) { if (protoProps) collapse_defineProperties(Constructor.prototype, protoProps); if (staticProps) collapse_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var collapse_Default = {
  triggerEl: null,
  onCollapse: function onCollapse() {},
  onExpand: function onExpand() {},
  onToggle: function onToggle() {}
};

var Collapse = /*#__PURE__*/function () {
  function Collapse() {
    var targetEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 ? arguments[1] : undefined;

    collapse_classCallCheck(this, Collapse);

    this._targetEl = targetEl;
    this._triggerEl = options ? options.triggerEl : collapse_Default.triggerEl;
    this._options = collapse_objectSpread(collapse_objectSpread({}, collapse_Default), options);
    this._visible = false;

    this._init();
  }

  collapse_createClass(Collapse, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      if (this._triggerEl) {
        if (this._triggerEl.hasAttribute('aria-expanded')) {
          this._visible = this._triggerEl.getAttribute('aria-expanded') === 'true' ? true : false;
        } else {
          // fix until v2 not to break previous single collapses which became dismiss
          this._visible = this._targetEl.classList.contains('hidden') ? false : true;
        }

        this._triggerEl.addEventListener('click', function () {
          _this._visible ? _this.collapse() : _this.expand();
        });
      }
    }
  }, {
    key: "collapse",
    value: function collapse() {
      this._targetEl.classList.add('hidden');

      if (this._triggerEl) {
        this._triggerEl.setAttribute('aria-expanded', 'false');
      }

      this._visible = false; // callback function

      this._options.onCollapse(this);
    }
  }, {
    key: "expand",
    value: function expand() {
      this._targetEl.classList.remove('hidden');

      if (this._triggerEl) {
        this._triggerEl.setAttribute('aria-expanded', 'true');
      }

      this._visible = true; // callback function

      this._options.onExpand(this);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this._visible) {
        this.collapse();
      } else {
        this.expand();
      }
    }
  }]);

  return Collapse;
}();

window.Collapse = Collapse;

function initCollapse() {
  document.querySelectorAll('[data-collapse-toggle]').forEach(function (triggerEl) {
    var targetEl = document.getElementById(triggerEl.getAttribute('data-collapse-toggle'));
    new Collapse(targetEl, {
      triggerEl: triggerEl
    });
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initCollapse();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initCollapse);
}

/* harmony default export */ const collapse = (Collapse);
;// CONCATENATED MODULE: ./src/components/carousel.js
function carousel_toConsumableArray(arr) { return carousel_arrayWithoutHoles(arr) || carousel_iterableToArray(arr) || carousel_unsupportedIterableToArray(arr) || carousel_nonIterableSpread(); }

function carousel_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function carousel_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return carousel_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return carousel_arrayLikeToArray(o, minLen); }

function carousel_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function carousel_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return carousel_arrayLikeToArray(arr); }

function carousel_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function carousel_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function carousel_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? carousel_ownKeys(Object(source), !0).forEach(function (key) { carousel_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : carousel_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function carousel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function carousel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function carousel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function carousel_createClass(Constructor, protoProps, staticProps) { if (protoProps) carousel_defineProperties(Constructor.prototype, protoProps); if (staticProps) carousel_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var carousel_Default = {
  defaultPosition: 0,
  indicators: {
    items: [],
    activeClasses: 'bg-white dark:bg-gray-800',
    inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
  },
  interval: 3000,
  onNext: function onNext() {},
  onPrev: function onPrev() {},
  onChange: function onChange() {}
};

var Carousel = /*#__PURE__*/function () {
  function Carousel() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    carousel_classCallCheck(this, Carousel);

    this._items = items;
    this._options = carousel_objectSpread(carousel_objectSpread(carousel_objectSpread({}, carousel_Default), options), {}, {
      indicators: carousel_objectSpread(carousel_objectSpread({}, carousel_Default.indicators), options.indicators)
    });
    this._activeItem = this.getItem(this._options.defaultPosition);
    this._indicators = this._options.indicators.items;
    this._interval = null;

    this._init();
  }
  /**
   * Initialise carousel and items based on active one
   */


  carousel_createClass(Carousel, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this._items.map(function (item) {
        item.el.classList.add('absolute', 'inset-0', 'transition-all', 'transform');
      }); // if no active item is set then first position is default


      if (this._getActiveItem()) {
        this.slideTo(this._getActiveItem().position);
      } else {
        this.slideTo(0);
      }

      this._indicators.map(function (indicator, position) {
        indicator.el.addEventListener('click', function () {
          _this.slideTo(position);
        });
      });
    }
  }, {
    key: "getItem",
    value: function getItem(position) {
      return this._items[position];
    }
    /**
     * Slide to the element based on id
     * @param {*} position 
     */

  }, {
    key: "slideTo",
    value: function slideTo(position) {
      var nextItem = this._items[position];
      var rotationItems = {
        'left': nextItem.position === 0 ? this._items[this._items.length - 1] : this._items[nextItem.position - 1],
        'middle': nextItem,
        'right': nextItem.position === this._items.length - 1 ? this._items[0] : this._items[nextItem.position + 1]
      };

      this._rotate(rotationItems);

      this._setActiveItem(nextItem.position);

      if (this._interval) {
        this.pause();
        this.cycle();
      }

      this._options.onChange(this);
    }
    /**
     * Based on the currently active item it will go to the next position
     */

  }, {
    key: "next",
    value: function next() {
      var activeItem = this._getActiveItem();

      var nextItem = null; // check if last item

      if (activeItem.position === this._items.length - 1) {
        nextItem = this._items[0];
      } else {
        nextItem = this._items[activeItem.position + 1];
      }

      this.slideTo(nextItem.position); // callback function

      this._options.onNext(this);
    }
    /**
     * Based on the currently active item it will go to the previous position
     */

  }, {
    key: "prev",
    value: function prev() {
      var activeItem = this._getActiveItem();

      var prevItem = null; // check if first item

      if (activeItem.position === 0) {
        prevItem = this._items[this._items.length - 1];
      } else {
        prevItem = this._items[activeItem.position - 1];
      }

      this.slideTo(prevItem.position); // callback function

      this._options.onPrev(this);
    }
    /**
     * This method applies the transform classes based on the left, middle, and right rotation carousel items
     * @param {*} rotationItems 
     */

  }, {
    key: "_rotate",
    value: function _rotate(rotationItems) {
      // reset
      this._items.map(function (item) {
        item.el.classList.add('hidden');
      }); // left item (previously active)


      rotationItems.left.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-20');
      rotationItems.left.el.classList.add('-translate-x-full', 'z-10'); // currently active item

      rotationItems.middle.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-10');
      rotationItems.middle.el.classList.add('translate-x-0', 'z-20'); // right item (upcoming active)

      rotationItems.right.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-20');
      rotationItems.right.el.classList.add('translate-x-full', 'z-10');
    }
    /**
     * Set an interval to cycle through the carousel items
     */

  }, {
    key: "cycle",
    value: function cycle() {
      var _this2 = this;

      this._interval = setInterval(function () {
        _this2.next();
      }, this._options.interval);
    }
    /**
     * Clears the cycling interval
     */

  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this._interval);
    }
    /**
     * Get the currently active item
     */

  }, {
    key: "_getActiveItem",
    value: function _getActiveItem() {
      return this._activeItem;
    }
    /**
     * Set the currently active item and data attribute
     * @param {*} position 
     */

  }, {
    key: "_setActiveItem",
    value: function _setActiveItem(position) {
      var _this3 = this;

      this._activeItem = this._items[position]; // update the indicators if available

      if (this._indicators.length) {
        var _this$_indicators$pos, _this$_indicators$pos2;

        this._indicators.map(function (indicator) {
          var _indicator$el$classLi, _indicator$el$classLi2;

          indicator.el.setAttribute('aria-current', 'false');

          (_indicator$el$classLi = indicator.el.classList).remove.apply(_indicator$el$classLi, carousel_toConsumableArray(_this3._options.indicators.activeClasses.split(" ")));

          (_indicator$el$classLi2 = indicator.el.classList).add.apply(_indicator$el$classLi2, carousel_toConsumableArray(_this3._options.indicators.inactiveClasses.split(" ")));
        });

        (_this$_indicators$pos = this._indicators[position].el.classList).add.apply(_this$_indicators$pos, carousel_toConsumableArray(this._options.indicators.activeClasses.split(" ")));

        (_this$_indicators$pos2 = this._indicators[position].el.classList).remove.apply(_this$_indicators$pos2, carousel_toConsumableArray(this._options.indicators.inactiveClasses.split(" ")));

        this._indicators[position].el.setAttribute('aria-current', 'true');
      }
    }
  }]);

  return Carousel;
}();

window.Carousel = Carousel;

function initCarousel() {
  document.querySelectorAll('[data-carousel]').forEach(function (carouselEl) {
    var interval = carouselEl.getAttribute('data-carousel-interval');
    var slide = carouselEl.getAttribute('data-carousel') === 'slide' ? true : false;
    var items = [];
    var defaultPosition = 0;

    if (carouselEl.querySelectorAll('[data-carousel-item]').length) {
      carousel_toConsumableArray(carouselEl.querySelectorAll('[data-carousel-item]')).map(function (carouselItemEl, position) {
        items.push({
          position: position,
          el: carouselItemEl
        });

        if (carouselItemEl.getAttribute('data-carousel-item') === 'active') {
          defaultPosition = position;
        }
      });
    }

    var indicators = [];

    if (carouselEl.querySelectorAll('[data-carousel-slide-to]').length) {
      carousel_toConsumableArray(carouselEl.querySelectorAll('[data-carousel-slide-to]')).map(function (indicatorEl) {
        indicators.push({
          position: indicatorEl.getAttribute('data-carousel-slide-to'),
          el: indicatorEl
        });
      });
    }

    var carousel = new Carousel(items, {
      defaultPosition: defaultPosition,
      indicators: {
        items: indicators
      },
      interval: interval ? interval : carousel_Default.interval
    });

    if (slide) {
      carousel.cycle();
    } // check for controls


    var carouselNextEl = carouselEl.querySelector('[data-carousel-next]');
    var carouselPrevEl = carouselEl.querySelector('[data-carousel-prev]');

    if (carouselNextEl) {
      carouselNextEl.addEventListener('click', function () {
        carousel.next();
      });
    }

    if (carouselPrevEl) {
      carouselPrevEl.addEventListener('click', function () {
        carousel.prev();
      });
    }
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initCarousel();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initCarousel);
}

/* harmony default export */ const carousel = (Carousel);
;// CONCATENATED MODULE: ./src/components/dismiss.js
function dismiss_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function dismiss_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? dismiss_ownKeys(Object(source), !0).forEach(function (key) { dismiss_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : dismiss_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function dismiss_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function dismiss_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dismiss_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dismiss_createClass(Constructor, protoProps, staticProps) { if (protoProps) dismiss_defineProperties(Constructor.prototype, protoProps); if (staticProps) dismiss_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var dismiss_Default = {
  triggerEl: null,
  transition: 'transition-opacity',
  duration: 300,
  timing: 'ease-out',
  onHide: function onHide() {}
};

var Dismiss = /*#__PURE__*/function () {
  function Dismiss() {
    var targetEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    dismiss_classCallCheck(this, Dismiss);

    this._targetEl = targetEl;
    this._triggerEl = options ? options.triggerEl : dismiss_Default.triggerEl;
    this._options = dismiss_objectSpread(dismiss_objectSpread({}, dismiss_Default), options);

    this._init();
  }

  dismiss_createClass(Dismiss, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      if (this._triggerEl) {
        this._triggerEl.addEventListener('click', function () {
          _this.hide();
        });
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, 'opacity-0');

      setTimeout(function () {
        _this2._targetEl.classList.add('hidden');
      }, this._options.duration); // callback function

      this._options.onHide(this, this._targetEl);
    }
  }]);

  return Dismiss;
}();

window.Dismiss = Dismiss;

function initDismiss() {
  document.querySelectorAll('[data-dismiss-target]').forEach(function (triggerEl) {
    var targetEl = document.querySelector(triggerEl.getAttribute('data-dismiss-target'));
    new Dismiss(targetEl, {
      triggerEl: triggerEl
    });
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initDismiss();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initDismiss);
}

/* harmony default export */ const dismiss = (Dismiss);
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js


function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}


;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/math.js
var math_max = Math.max;
var math_min = Math.min;
var round = Math.round;
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js


function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
    // Fallback to 1 in case both values are `0`

    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }

    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }

  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js




function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js



function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js







function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/enums.js
var enums_top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [enums_top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var enums_placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/orderModifiers.js
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/createPopper.js














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (false) { var _getComputedStyle, marginTop, marginRight, marginBottom, marginLeft, flipModifier, modifiers; }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (false) {}

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {}

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (false) {}

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/(/* unused pure expression or super */ null && (0)); // eslint-disable-next-line import/no-unused-modules


;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const eventListeners = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js

function getBasePlacement(placement) {
  return placement.split('-')[0];
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split('-')[1];
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/computeOffsets.js




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case enums_top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_popperOffsets = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = enums_top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === enums_top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === enums_top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (false) { var transitionProperty; }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_computeStyles = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function applyStyles_effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_applyStyles = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: applyStyles_effect,
  requires: ['computeStyles']
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/offset.js

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, enums_top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = enums_placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_offset = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var getOppositeVariationPlacement_hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return getOppositeVariationPlacement_hash[matched];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js



function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = math_max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = math_max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/contains.js

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js















function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = math_max(rect.top, accRect.top);
    accRect.right = math_min(rect.right, accRect.right);
    accRect.bottom = math_min(rect.bottom, accRect.bottom);
    accRect.left = math_max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/detectOverflow.js








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [enums_top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? enums_placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (false) {}
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/flip.js






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [enums_top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : enums_top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_flip = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/within.js

function within(min, value, max) {
  return math_max(min, math_min(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? enums_top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? math_min(min, tetherMin) : min, offset, tether ? math_max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? enums_top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [enums_top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_preventOverflow = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/arrow.js









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? enums_top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function arrow_effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (false) {}

  if (!contains(state.elements.popper, arrowElement)) {
    if (false) {}

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_arrow = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: arrow_effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/hide.js



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [enums_top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_hide = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/popper.js










var defaultModifiers = [eventListeners, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow, modifiers_hide];
var popper_createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules


;// CONCATENATED MODULE: ./src/components/dropdown.js
function dropdown_toConsumableArray(arr) { return dropdown_arrayWithoutHoles(arr) || dropdown_iterableToArray(arr) || dropdown_unsupportedIterableToArray(arr) || dropdown_nonIterableSpread(); }

function dropdown_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dropdown_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dropdown_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dropdown_arrayLikeToArray(o, minLen); }

function dropdown_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function dropdown_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return dropdown_arrayLikeToArray(arr); }

function dropdown_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dropdown_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function dropdown_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? dropdown_ownKeys(Object(source), !0).forEach(function (key) { dropdown_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : dropdown_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function dropdown_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function dropdown_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dropdown_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dropdown_createClass(Constructor, protoProps, staticProps) { if (protoProps) dropdown_defineProperties(Constructor.prototype, protoProps); if (staticProps) dropdown_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var dropdown_Default = {
  placement: 'bottom',
  triggerType: 'click',
  onShow: function onShow() {},
  onHide: function onHide() {}
};

var Dropdown = /*#__PURE__*/function () {
  function Dropdown() {
    var targetElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var triggerElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    dropdown_classCallCheck(this, Dropdown);

    this._targetEl = targetElement;
    this._triggerEl = triggerElement;
    this._options = dropdown_objectSpread(dropdown_objectSpread({}, dropdown_Default), options);
    this._popperInstance = this._createPopperInstace();
    this._visible = false;

    this._init();
  }

  dropdown_createClass(Dropdown, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      if (this._triggerEl) {
        this._triggerEl.addEventListener('click', function () {
          _this.toggle();
        });
      }
    }
  }, {
    key: "_createPopperInstace",
    value: function _createPopperInstace() {
      return popper_createPopper(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 10]
          }
        }]
      });
    }
  }, {
    key: "_handleClickOutside",
    value: function _handleClickOutside(ev, targetEl) {
      var clickedEl = ev.target;

      if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && this._visible) {
        this.hide();
      }

      document.body.removeEventListener('click', this._handleClickOutside, true);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this._visible) {
        this.hide();
        document.body.removeEventListener('click', this._handleClickOutside, true);
      } else {
        this.show();
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this2 = this;

      this._targetEl.classList.remove('hidden');

      this._targetEl.classList.add('block'); // Enable the event listeners


      this._popperInstance.setOptions(function (options) {
        return dropdown_objectSpread(dropdown_objectSpread({}, options), {}, {
          modifiers: [].concat(dropdown_toConsumableArray(options.modifiers), [{
            name: 'eventListeners',
            enabled: true
          }])
        });
      });

      document.body.addEventListener('click', function (ev) {
        _this2._handleClickOutside(ev, _this2._targetEl);
      }, true); // Update its position

      this._popperInstance.update();

      this._visible = true; // callback function

      this._options.onShow(this);
    }
  }, {
    key: "hide",
    value: function hide() {
      this._targetEl.classList.remove('block');

      this._targetEl.classList.add('hidden'); // Disable the event listeners


      this._popperInstance.setOptions(function (options) {
        return dropdown_objectSpread(dropdown_objectSpread({}, options), {}, {
          modifiers: [].concat(dropdown_toConsumableArray(options.modifiers), [{
            name: 'eventListeners',
            enabled: false
          }])
        });
      });

      this._visible = false; // callback function

      this._options.onHide(this);
    }
  }]);

  return Dropdown;
}();

window.Dropdown = Dropdown;

function initDropdown() {
  document.querySelectorAll('[data-dropdown-toggle]').forEach(function (triggerEl) {
    var targetEl = document.getElementById(triggerEl.getAttribute('data-dropdown-toggle'));
    var placement = triggerEl.getAttribute('data-dropdown-placement');
    new Dropdown(targetEl, triggerEl, {
      placement: placement ? placement : dropdown_Default.placement
    });
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initDropdown();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initDropdown);
}

/* harmony default export */ const dropdown = (Dropdown);
;// CONCATENATED MODULE: ./src/components/modal.js
function modal_toConsumableArray(arr) { return modal_arrayWithoutHoles(arr) || modal_iterableToArray(arr) || modal_unsupportedIterableToArray(arr) || modal_nonIterableSpread(); }

function modal_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function modal_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return modal_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return modal_arrayLikeToArray(o, minLen); }

function modal_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function modal_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return modal_arrayLikeToArray(arr); }

function modal_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function modal_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function modal_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? modal_ownKeys(Object(source), !0).forEach(function (key) { modal_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : modal_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function modal_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function modal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function modal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function modal_createClass(Constructor, protoProps, staticProps) { if (protoProps) modal_defineProperties(Constructor.prototype, protoProps); if (staticProps) modal_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var modal_Default = {
  placement: 'center',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  onHide: function onHide() {},
  onShow: function onShow() {},
  onToggle: function onToggle() {}
};

var Modal = /*#__PURE__*/function () {
  function Modal() {
    var targetEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    modal_classCallCheck(this, Modal);

    this._targetEl = targetEl;
    this._options = modal_objectSpread(modal_objectSpread({}, modal_Default), options);
    this._isHidden = true;

    this._init();
  }

  modal_createClass(Modal, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this._getPlacementClasses().map(function (c) {
        _this._targetEl.classList.add(c);
      });
    }
  }, {
    key: "_createBackdrop",
    value: function _createBackdrop() {
      if (this._isHidden) {
        var _backdropEl$classList;

        var backdropEl = document.createElement('div');
        backdropEl.setAttribute('modal-backdrop', '');

        (_backdropEl$classList = backdropEl.classList).add.apply(_backdropEl$classList, modal_toConsumableArray(this._options.backdropClasses.split(" ")));

        document.querySelector('body').append(backdropEl);
      }
    }
  }, {
    key: "_destroyBackdropEl",
    value: function _destroyBackdropEl() {
      if (!this._isHidden) {
        document.querySelector('[modal-backdrop]').remove();
      }
    }
  }, {
    key: "_getPlacementClasses",
    value: function _getPlacementClasses() {
      switch (this._options.placement) {
        // top
        case 'top-left':
          return ['justify-start', 'items-start'];

        case 'top-center':
          return ['justify-center', 'items-start'];

        case 'top-right':
          return ['justify-end', 'items-start'];
        // center

        case 'center-left':
          return ['justify-start', 'items-center'];

        case 'center':
          return ['justify-center', 'items-center'];

        case 'center-right':
          return ['justify-end', 'items-center'];
        // bottom

        case 'bottom-left':
          return ['justify-start', 'items-end'];

        case 'bottom-center':
          return ['justify-center', 'items-end'];

        case 'bottom-right':
          return ['justify-end', 'items-end'];

        default:
          return ['justify-center', 'items-center'];
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this._isHidden) {
        this.show();
      } else {
        this.hide();
      } // callback function


      this._options.onToggle(this);
    }
  }, {
    key: "show",
    value: function show() {
      this._targetEl.classList.add('flex');

      this._targetEl.classList.remove('hidden');

      this._targetEl.setAttribute('aria-modal', 'true');

      this._targetEl.setAttribute('role', 'dialog');

      this._targetEl.removeAttribute('aria-hidden');

      this._createBackdrop();

      this._isHidden = false; // callback function

      this._options.onShow(this);
    }
  }, {
    key: "hide",
    value: function hide() {
      this._targetEl.classList.add('hidden');

      this._targetEl.classList.remove('flex');

      this._targetEl.setAttribute('aria-hidden', 'true');

      this._targetEl.removeAttribute('aria-modal');

      this._targetEl.removeAttribute('role');

      this._destroyBackdropEl();

      this._isHidden = true; // callback function

      this._options.onHide(this);
    }
  }]);

  return Modal;
}();

window.Modal = Modal;

var getModalInstance = function getModalInstance(id, instances) {
  if (instances.some(function (modalInstance) {
    return modalInstance.id === id;
  })) {
    return instances.find(function (modalInstance) {
      return modalInstance.id === id;
    });
  }

  return false;
};

function initModal() {
  var modalInstances = [];
  document.querySelectorAll('[data-modal-toggle]').forEach(function (el) {
    var modalId = el.getAttribute('data-modal-toggle');
    var modalEl = document.getElementById(modalId);
    var placement = modalEl.getAttribute('data-modal-placement');

    if (modalEl) {
      if (!modalEl.hasAttribute('aria-hidden') && !modalEl.hasAttribute('aria-modal')) {
        modalEl.setAttribute('aria-hidden', 'true');
      }
    }

    var modal = null;

    if (getModalInstance(modalId, modalInstances)) {
      modal = getModalInstance(modalId, modalInstances);
      modal = modal.object;
    } else {
      modal = new Modal(modalEl, {
        placement: placement ? placement : modal_Default.placement
      });
      modalInstances.push({
        id: modalId,
        object: modal
      });
    }

    if (modalEl.hasAttribute('data-modal-show') && modalEl.getAttribute('data-modal-show') === 'true') {
      modal.show();
    }

    el.addEventListener('click', function () {
      modal.toggle();
    });
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initModal();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initModal);
}

/* harmony default export */ const modal = (Modal);
;// CONCATENATED MODULE: ./src/components/drawer.js
function drawer_toConsumableArray(arr) { return drawer_arrayWithoutHoles(arr) || drawer_iterableToArray(arr) || drawer_unsupportedIterableToArray(arr) || drawer_nonIterableSpread(); }

function drawer_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function drawer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return drawer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return drawer_arrayLikeToArray(o, minLen); }

function drawer_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function drawer_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return drawer_arrayLikeToArray(arr); }

function drawer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function drawer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function drawer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? drawer_ownKeys(Object(source), !0).forEach(function (key) { drawer_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : drawer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function drawer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function drawer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function drawer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function drawer_createClass(Constructor, protoProps, staticProps) { if (protoProps) drawer_defineProperties(Constructor.prototype, protoProps); if (staticProps) drawer_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var drawer_Default = {
  placement: 'left',
  bodyScrolling: false,
  backdrop: true,
  edge: false,
  edgeOffset: 'bottom-[60px]',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
  onShow: function onShow() {},
  onHide: function onHide() {},
  onToggle: function onToggle() {}
};

var Drawer = /*#__PURE__*/function () {
  function Drawer() {
    var targetEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 ? arguments[1] : undefined;

    drawer_classCallCheck(this, Drawer);

    this._targetEl = targetEl;
    this._options = drawer_objectSpread(drawer_objectSpread({}, drawer_Default), options);
    this._visible = false;

    this._init();
  }

  drawer_createClass(Drawer, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      // set initial accessibility attributes
      if (this._targetEl) {
        this._targetEl.setAttribute('aria-hidden', 'true');

        this._targetEl.classList.add('transition-transform');
      } // set base placement classes


      this._getPlacementClasses(this._options.placement).base.map(function (c) {
        _this._targetEl.classList.add(c);
      }); // hide by default


      this.hide();
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this._visible;
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      // based on the edge option show placement classes
      if (this._options.edge) {
        this._getPlacementClasses(this._options.placement + '-edge').active.map(function (c) {
          _this2._targetEl.classList.remove(c);
        });

        this._getPlacementClasses(this._options.placement + '-edge').inactive.map(function (c) {
          _this2._targetEl.classList.add(c);
        });
      } else {
        this._getPlacementClasses(this._options.placement).active.map(function (c) {
          _this2._targetEl.classList.remove(c);
        });

        this._getPlacementClasses(this._options.placement).inactive.map(function (c) {
          _this2._targetEl.classList.add(c);
        });
      } // set accessibility attributes


      this._targetEl.setAttribute('aria-hidden', 'true');

      this._targetEl.removeAttribute('aria-modal');

      this._targetEl.removeAttribute('role'); // enable body scroll


      if (!this._options.bodyScrolling) {
        document.body.classList.remove('overflow-hidden');
      } // destroy backdrop


      if (this._options.backdrop) {
        this._destroyBackdropEl();
      }

      this._visible = false; // callback function

      this._options.onHide(this);
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;

      if (this._options.edge) {
        this._getPlacementClasses(this._options.placement + '-edge').active.map(function (c) {
          _this3._targetEl.classList.add(c);
        });

        this._getPlacementClasses(this._options.placement + '-edge').inactive.map(function (c) {
          _this3._targetEl.classList.remove(c);
        });
      } else {
        this._getPlacementClasses(this._options.placement).active.map(function (c) {
          _this3._targetEl.classList.add(c);
        });

        this._getPlacementClasses(this._options.placement).inactive.map(function (c) {
          _this3._targetEl.classList.remove(c);
        });
      } // set accessibility attributes


      this._targetEl.setAttribute('aria-modal', 'true');

      this._targetEl.setAttribute('role', 'dialog');

      this._targetEl.removeAttribute('aria-hidden'); // disable body scroll


      if (!this._options.bodyScrolling) {
        document.body.classList.add('overflow-hidden');
      } // show backdrop


      if (this._options.backdrop) {
        this._createBackdrop();
      }

      this._visible = true; // callback function

      this._options.onShow(this);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isVisible()) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: "_createBackdrop",
    value: function _createBackdrop() {
      var _this4 = this;

      if (!this._visible) {
        var _backdropEl$classList;

        var backdropEl = document.createElement('div');
        backdropEl.setAttribute('drawer-backdrop', '');

        (_backdropEl$classList = backdropEl.classList).add.apply(_backdropEl$classList, drawer_toConsumableArray(this._options.backdropClasses.split(" ")));

        document.querySelector('body').append(backdropEl);
        backdropEl.addEventListener('click', function () {
          _this4.hide();
        });
      }
    }
  }, {
    key: "_destroyBackdropEl",
    value: function _destroyBackdropEl() {
      if (this._visible) {
        document.querySelector('[drawer-backdrop]').remove();
      }
    }
  }, {
    key: "_getPlacementClasses",
    value: function _getPlacementClasses(placement) {
      switch (placement) {
        case 'top':
          return {
            base: ['top-0', 'left-0', 'right-0'],
            active: ['transform-none'],
            inactive: ['-translate-y-full']
          };

        case 'right':
          return {
            base: ['right-0', 'top-0'],
            active: ['transform-none'],
            inactive: ['translate-x-full']
          };

        case 'bottom':
          return {
            base: ['bottom-0', 'left-0', 'right-0'],
            active: ['transform-none'],
            inactive: ['translate-y-full']
          };

        case 'left':
          return {
            base: ['left-0', 'top-0'],
            active: ['transform-none'],
            inactive: ['-translate-x-full']
          };

        case 'bottom-edge':
          return {
            base: ['left-0', 'top-0'],
            active: ['transform-none'],
            inactive: ['translate-y-full', this._options.edgeOffset]
          };

        default:
          return {
            base: ['left-0', 'top-0'],
            active: ['transform-none'],
            inactive: ['-translate-x-full']
          };
      }
    }
  }]);

  return Drawer;
}();

window.Drawer = Drawer;

var getDrawerInstance = function getDrawerInstance(id, instances) {
  if (instances.some(function (drawerInstance) {
    return drawerInstance.id === id;
  })) {
    return instances.find(function (drawerInstance) {
      return drawerInstance.id === id;
    });
  }

  return false;
};

function initDrawer() {
  var drawerInstances = [];
  document.querySelectorAll('[data-drawer-target]').forEach(function (triggerEl) {
    // mandatory
    var targetEl = document.getElementById(triggerEl.getAttribute('data-drawer-target'));
    var drawerId = targetEl.id; // optional

    var placement = triggerEl.getAttribute('data-drawer-placement');
    var bodyScrolling = triggerEl.getAttribute('data-drawer-body-scrolling');
    var backdrop = triggerEl.getAttribute('data-drawer-backdrop');
    var edge = triggerEl.getAttribute('data-drawer-edge');
    var edgeOffset = triggerEl.getAttribute('data-drawer-edge-offset');
    var drawer = null;

    if (getDrawerInstance(drawerId, drawerInstances)) {
      drawer = getDrawerInstance(drawerId, drawerInstances);
      drawer = drawer.object;
    } else {
      drawer = new Drawer(targetEl, {
        placement: placement ? placement : drawer_Default.placement,
        bodyScrolling: bodyScrolling ? bodyScrolling === 'true' ? true : false : drawer_Default.bodyScrolling,
        backdrop: backdrop ? backdrop === 'true' ? true : false : drawer_Default.backdrop,
        edge: edge ? edge === 'true' ? true : false : drawer_Default.edge,
        edgeOffset: edgeOffset ? edgeOffset : drawer_Default.edgeOffset
      });
      drawerInstances.push({
        id: drawerId,
        object: drawer
      });
    }
  });
  document.querySelectorAll('[data-drawer-toggle]').forEach(function (triggerEl) {
    var targetEl = document.getElementById(triggerEl.getAttribute('data-drawer-toggle'));
    var drawerId = targetEl.id;
    var drawer = getDrawerInstance(drawerId, drawerInstances);
    triggerEl.addEventListener('click', function () {
      if (drawer.object.isVisible()) {
        drawer.object.hide();
      } else {
        drawer.object.show();
      }
    });
  });
  document.querySelectorAll('[data-drawer-dismiss]').forEach(function (triggerEl) {
    var targetEl = document.getElementById(triggerEl.getAttribute('data-drawer-dismiss'));
    var drawerId = targetEl.id;
    var drawer = getDrawerInstance(drawerId, drawerInstances);
    triggerEl.addEventListener('click', function () {
      drawer.object.hide();
    });
  });
  document.querySelectorAll('[data-drawer-show]').forEach(function (triggerEl) {
    var targetEl = document.getElementById(triggerEl.getAttribute('data-drawer-show'));
    var drawerId = targetEl.id;
    var drawer = getDrawerInstance(drawerId, drawerInstances);
    triggerEl.addEventListener('click', function () {
      drawer.object.show();
    });
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initDrawer();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initDrawer);
}

/* harmony default export */ const drawer = (Drawer);
;// CONCATENATED MODULE: ./src/components/tabs.js
function tabs_toConsumableArray(arr) { return tabs_arrayWithoutHoles(arr) || tabs_iterableToArray(arr) || tabs_unsupportedIterableToArray(arr) || tabs_nonIterableSpread(); }

function tabs_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function tabs_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return tabs_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return tabs_arrayLikeToArray(o, minLen); }

function tabs_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function tabs_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return tabs_arrayLikeToArray(arr); }

function tabs_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function tabs_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function tabs_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? tabs_ownKeys(Object(source), !0).forEach(function (key) { tabs_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : tabs_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function tabs_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tabs_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tabs_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function tabs_createClass(Constructor, protoProps, staticProps) { if (protoProps) tabs_defineProperties(Constructor.prototype, protoProps); if (staticProps) tabs_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var tabs_Default = {
  defaultTabId: null,
  activeClasses: 'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500',
  inactiveClasses: 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
  onShow: function onShow() {}
};

var Tabs = /*#__PURE__*/function () {
  function Tabs() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    tabs_classCallCheck(this, Tabs);

    this._items = items;
    this._activeTab = options ? this.getTab(options.defaultTabId) : null;
    this._options = tabs_objectSpread(tabs_objectSpread({}, tabs_Default), options);

    this._init();
  }

  tabs_createClass(Tabs, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      if (this._items.length) {
        // set the first tab as active if not set by explicitly
        if (!this._activeTab) {
          this._setActiveTab(this._items[0]);
        } // force show the first default tab


        this.show(this._activeTab.id, true); // show tab content based on click

        this._items.map(function (tab) {
          tab.triggerEl.addEventListener('click', function () {
            _this.show(tab.id);
          });
        });
      }
    }
  }, {
    key: "getActiveTab",
    value: function getActiveTab() {
      return this._activeTab;
    }
  }, {
    key: "_setActiveTab",
    value: function _setActiveTab(tab) {
      this._activeTab = tab;
    }
  }, {
    key: "getTab",
    value: function getTab(id) {
      return this._items.filter(function (t) {
        return t.id === id;
      })[0];
    }
  }, {
    key: "show",
    value: function show(id) {
      var _this2 = this,
          _tab$triggerEl$classL,
          _tab$triggerEl$classL2;

      var forceShow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var tab = this.getTab(id); // don't do anything if already active

      if (tab === this._activeTab && !forceShow) {
        return;
      } // hide other tabs


      this._items.map(function (t) {
        if (t !== tab) {
          var _t$triggerEl$classLis, _t$triggerEl$classLis2;

          (_t$triggerEl$classLis = t.triggerEl.classList).remove.apply(_t$triggerEl$classLis, tabs_toConsumableArray(_this2._options.activeClasses.split(" ")));

          (_t$triggerEl$classLis2 = t.triggerEl.classList).add.apply(_t$triggerEl$classLis2, tabs_toConsumableArray(_this2._options.inactiveClasses.split(" ")));

          t.targetEl.classList.add('hidden');
          t.triggerEl.setAttribute('aria-selected', false);
        }
      }); // show active tab


      (_tab$triggerEl$classL = tab.triggerEl.classList).add.apply(_tab$triggerEl$classL, tabs_toConsumableArray(this._options.activeClasses.split(" ")));

      (_tab$triggerEl$classL2 = tab.triggerEl.classList).remove.apply(_tab$triggerEl$classL2, tabs_toConsumableArray(this._options.inactiveClasses.split(" ")));

      tab.triggerEl.setAttribute('aria-selected', true);
      tab.targetEl.classList.remove('hidden');

      this._setActiveTab(tab); // callback function


      this._options.onShow(this, tab);
    }
  }]);

  return Tabs;
}();

window.Tabs = Tabs;

function initTabs() {
  document.querySelectorAll('[data-tabs-toggle]').forEach(function (triggerEl) {
    var tabElements = [];
    var defaultTabId = null;
    triggerEl.querySelectorAll('[role="tab"]').forEach(function (el) {
      var isActive = el.getAttribute('aria-selected') === 'true';
      var tab = {
        id: el.getAttribute('data-tabs-target'),
        triggerEl: el,
        targetEl: document.querySelector(el.getAttribute('data-tabs-target'))
      };
      tabElements.push(tab);

      if (isActive) {
        defaultTabId = tab.id;
      }
    });
    new Tabs(tabElements, {
      defaultTabId: defaultTabId
    });
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initTabs();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initTabs);
}

/* harmony default export */ const tabs = (Tabs);
;// CONCATENATED MODULE: ./src/components/tooltip.js
function tooltip_toConsumableArray(arr) { return tooltip_arrayWithoutHoles(arr) || tooltip_iterableToArray(arr) || tooltip_unsupportedIterableToArray(arr) || tooltip_nonIterableSpread(); }

function tooltip_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function tooltip_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return tooltip_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return tooltip_arrayLikeToArray(o, minLen); }

function tooltip_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function tooltip_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return tooltip_arrayLikeToArray(arr); }

function tooltip_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function tooltip_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function tooltip_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? tooltip_ownKeys(Object(source), !0).forEach(function (key) { tooltip_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : tooltip_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function tooltip_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tooltip_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tooltip_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function tooltip_createClass(Constructor, protoProps, staticProps) { if (protoProps) tooltip_defineProperties(Constructor.prototype, protoProps); if (staticProps) tooltip_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var tooltip_Default = {
  placement: 'top',
  triggerType: 'hover',
  onShow: function onShow() {},
  onHide: function onHide() {}
};

var Tooltip = /*#__PURE__*/function () {
  function Tooltip() {
    var targetEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var triggerEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    tooltip_classCallCheck(this, Tooltip);

    this._targetEl = targetEl;
    this._triggerEl = triggerEl;
    this._options = tooltip_objectSpread(tooltip_objectSpread({}, tooltip_Default), options);
    this._popperInstance = this._createPopperInstace();

    this._init();
  }

  tooltip_createClass(Tooltip, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      if (this._triggerEl) {
        var triggerEvents = this._getTriggerEvents();

        triggerEvents.showEvents.forEach(function (ev) {
          _this._triggerEl.addEventListener(ev, function () {
            _this.show();
          });
        });
        triggerEvents.hideEvents.forEach(function (ev) {
          _this._triggerEl.addEventListener(ev, function () {
            _this.hide();
          });
        });
      }
    }
  }, {
    key: "_createPopperInstace",
    value: function _createPopperInstace() {
      return popper_createPopper(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }]
      });
    }
  }, {
    key: "_getTriggerEvents",
    value: function _getTriggerEvents() {
      switch (this._options.triggerType) {
        case 'hover':
          return {
            showEvents: ['mouseenter', 'focus'],
            hideEvents: ['mouseleave', 'blur']
          };

        case 'click':
          return {
            showEvents: ['click', 'focus'],
            hideEvents: ['focusout', 'blur']
          };

        default:
          return {
            showEvents: ['mouseenter', 'focus'],
            hideEvents: ['mouseleave', 'blur']
          };
      }
    }
  }, {
    key: "show",
    value: function show() {
      this._targetEl.classList.remove('opacity-0', 'invisible');

      this._targetEl.classList.add('opacity-100', 'visible'); // Enable the event listeners


      this._popperInstance.setOptions(function (options) {
        return tooltip_objectSpread(tooltip_objectSpread({}, options), {}, {
          modifiers: [].concat(tooltip_toConsumableArray(options.modifiers), [{
            name: 'eventListeners',
            enabled: true
          }])
        });
      }); // Update its position


      this._popperInstance.update(); // callback function


      this._options.onShow(this);
    }
  }, {
    key: "hide",
    value: function hide() {
      this._targetEl.classList.remove('opacity-100', 'visible');

      this._targetEl.classList.add('opacity-0', 'invisible'); // Disable the event listeners


      this._popperInstance.setOptions(function (options) {
        return tooltip_objectSpread(tooltip_objectSpread({}, options), {}, {
          modifiers: [].concat(tooltip_toConsumableArray(options.modifiers), [{
            name: 'eventListeners',
            enabled: false
          }])
        });
      }); // callback function


      this._options.onHide(this);
    }
  }]);

  return Tooltip;
}();

window.Tooltip = Tooltip;

function initTooltip() {
  document.querySelectorAll('[data-tooltip-target]').forEach(function (triggerEl) {
    var targetEl = document.getElementById(triggerEl.getAttribute('data-tooltip-target'));
    var triggerType = triggerEl.getAttribute('data-tooltip-trigger');
    var placement = triggerEl.getAttribute('data-tooltip-placement');
    new Tooltip(targetEl, triggerEl, {
      placement: placement ? placement : tooltip_Default.placement,
      triggerType: triggerType ? triggerType : tooltip_Default.triggerType
    });
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initTooltip();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initTooltip);
}

/* harmony default export */ const tooltip = (Tooltip);
;// CONCATENATED MODULE: ./src/components/popover.js
function popover_toConsumableArray(arr) { return popover_arrayWithoutHoles(arr) || popover_iterableToArray(arr) || popover_unsupportedIterableToArray(arr) || popover_nonIterableSpread(); }

function popover_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function popover_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return popover_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return popover_arrayLikeToArray(o, minLen); }

function popover_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function popover_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return popover_arrayLikeToArray(arr); }

function popover_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function popover_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function popover_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? popover_ownKeys(Object(source), !0).forEach(function (key) { popover_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : popover_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function popover_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function popover_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function popover_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function popover_createClass(Constructor, protoProps, staticProps) { if (protoProps) popover_defineProperties(Constructor.prototype, protoProps); if (staticProps) popover_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var popover_Default = {
  placement: 'top',
  offset: 10,
  triggerType: 'hover',
  onShow: function onShow() {},
  onHide: function onHide() {}
};

var Popover = /*#__PURE__*/function () {
  function Popover() {
    var targetEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var triggerEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    popover_classCallCheck(this, Popover);

    this._targetEl = targetEl;
    this._triggerEl = triggerEl;
    this._options = popover_objectSpread(popover_objectSpread({}, popover_Default), options);
    this._popperInstance = this._createPopperInstace();

    this._init();
  }

  popover_createClass(Popover, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      if (this._triggerEl) {
        var triggerEvents = this._getTriggerEvents();

        triggerEvents.showEvents.forEach(function (ev) {
          _this._triggerEl.addEventListener(ev, function () {
            _this.show();
          });

          _this._targetEl.addEventListener(ev, function () {
            _this.show();
          });
        });
        triggerEvents.hideEvents.forEach(function (ev) {
          _this._triggerEl.addEventListener(ev, function () {
            setTimeout(function () {
              if (!_this._targetEl.matches(':hover')) {
                _this.hide();
              }
            }, 100);
          });

          _this._targetEl.addEventListener(ev, function () {
            setTimeout(function () {
              if (!_this._triggerEl.matches(':hover')) {
                _this.hide();
              }
            }, 100);
          });
        });
      }
    }
  }, {
    key: "_createPopperInstace",
    value: function _createPopperInstace() {
      return popper_createPopper(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, this._options.offset]
          }
        }]
      });
    }
  }, {
    key: "_getTriggerEvents",
    value: function _getTriggerEvents() {
      switch (this._options.triggerType) {
        case 'hover':
          return {
            showEvents: ['mouseenter', 'focus'],
            hideEvents: ['mouseleave', 'blur']
          };

        case 'click':
          return {
            showEvents: ['click', 'focus'],
            hideEvents: ['focusout', 'blur']
          };

        default:
          return {
            showEvents: ['mouseenter', 'focus'],
            hideEvents: ['mouseleave', 'blur']
          };
      }
    }
  }, {
    key: "show",
    value: function show() {
      this._targetEl.classList.remove('opacity-0', 'invisible');

      this._targetEl.classList.add('opacity-100', 'visible'); // Enable the event listeners


      this._popperInstance.setOptions(function (options) {
        return popover_objectSpread(popover_objectSpread({}, options), {}, {
          modifiers: [].concat(popover_toConsumableArray(options.modifiers), [{
            name: 'eventListeners',
            enabled: true
          }])
        });
      }); // Update its position


      this._popperInstance.update(); // callback function


      this._options.onShow(this);
    }
  }, {
    key: "hide",
    value: function hide() {
      this._targetEl.classList.remove('opacity-100', 'visible');

      this._targetEl.classList.add('opacity-0', 'invisible'); // Disable the event listeners


      this._popperInstance.setOptions(function (options) {
        return popover_objectSpread(popover_objectSpread({}, options), {}, {
          modifiers: [].concat(popover_toConsumableArray(options.modifiers), [{
            name: 'eventListeners',
            enabled: false
          }])
        });
      }); // callback function


      this._options.onHide(this);
    }
  }]);

  return Popover;
}();

window.Popover = Popover;

function initPopover() {
  document.querySelectorAll('[data-popover-target]').forEach(function (triggerEl) {
    var targetEl = document.getElementById(triggerEl.getAttribute('data-popover-target'));
    var triggerType = triggerEl.getAttribute('data-popover-trigger');
    var placement = triggerEl.getAttribute('data-popover-placement');
    var offset = triggerEl.getAttribute('data-popover-offset');
    new Popover(targetEl, triggerEl, {
      placement: placement ? placement : popover_Default.placement,
      offset: offset ? parseInt(offset) : popover_Default.offset,
      triggerType: triggerType ? triggerType : popover_Default.triggerType
    });
  });
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initPopover();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', initPopover);
}

/* harmony default export */ const popover = (Popover);
;// CONCATENATED MODULE: ./src/flowbite.js
 // core components











/* harmony default export */ const flowbite = ({
  Accordion: accordion,
  Collapse: collapse,
  Carousel: carousel,
  Dismiss: dismiss,
  Dropdown: dropdown,
  Modal: modal,
  Drawer: drawer,
  Tabs: tabs,
  Tooltip: tooltip,
  Popover: popover
});
/******/ })()
;
//# sourceMappingURL=flowbite.js.map

/***/ }),

/***/ 397:
/***/ ((__unused_webpack_module, exports) => {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      rLineSep = /\u2028/,
      rParagraphSep = /\u2029/;

  Hogan.tags = {
    '#': 1, '^': 2, '<': 3, '$': 4,
    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
    '{': 10, '&': 11, '_t': 12
  };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push({tag: '_t', text: new String(buf)});
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (tokens[j].text) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].text.toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[delimiters.length - 1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = Hogan.tags[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  // the tags allowed inside super templates
  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        tail = null,
        token = null;

    tail = stack[stack.length - 1];

    while (tokens.length > 0) {
      token = tokens.shift();

      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
        throw new Error('Illegal content in < super tag.');
      }

      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else if (token.tag == '\n') {
        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
      }

      instructions.push(token);
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function stringifySubstitutions(obj) {
    var items = [];
    for (var key in obj) {
      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
    }
    return "{ " + items.join(",") + " }";
  }

  function stringifyPartials(codeObj) {
    var partials = [];
    for (var key in codeObj.partials) {
      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
    }
    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
  }

  Hogan.stringify = function(codeObj, text, options) {
    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
  }

  var serialNo = 0;
  Hogan.generate = function(tree, text, options) {
    serialNo = 0;
    var context = { code: '', subs: {}, partials: {} };
    Hogan.walk(tree, context);

    if (options.asString) {
      return this.stringify(context, text, options);
    }

    return this.makeTemplate(context, text, options);
  }

  Hogan.wrapMain = function(code) {
    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
  }

  Hogan.template = Hogan.Template;

  Hogan.makeTemplate = function(codeObj, text, options) {
    var template = this.makePartials(codeObj);
    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
    return new this.template(template, text, this, options);
  }

  Hogan.makePartials = function(codeObj) {
    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
    for (key in template.partials) {
      template.partials[key] = this.makePartials(template.partials[key]);
    }
    for (key in codeObj.subs) {
      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
    }
    return template;
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r')
            .replace(rLineSep, '\\u2028')
            .replace(rParagraphSep, '\\u2029');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {name: node.n, partials: {}};
    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }

  Hogan.codegen = {
    '#': function(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                      't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },

    '^': function(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },

    '>': createPartial,
    '<': function(node, context) {
      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },

    '$': function(node, context) {
      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;
      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },

    '\n': function(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },

    '_v': function(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },

    '_t': function(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },

    '{': tripleStache,

    '&': tripleStache
  }

  function tripleStache(node, context) {
    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
  }

  function write(s) {
    return 't.b(' + s + ');';
  }

  Hogan.walk = function(nodelist, context) {
    var func;
    for (var i = 0, l = nodelist.length; i < l; i++) {
      func = Hogan.codegen[nodelist[i].tag];
      func && func(nodelist[i], context);
    }
    return context;
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  }

  Hogan.cache = {};

  Hogan.cacheKey = function(text, options) {
    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
  }

  Hogan.compile = function(text, options) {
    options = options || {};
    var key = Hogan.cacheKey(text, options);
    var template = this.cache[key];

    if (template) {
      var partials = template.partials;
      for (var name in partials) {
        delete partials[name].instance;
      }
      return template;
    }

    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = template;
  }
})( true ? exports : 0);


/***/ }),

/***/ 485:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// This file is for use with Node.js. See dist/ for browser files.

var Hogan = __webpack_require__(397);
Hogan.Template = (__webpack_require__(882).Template);
Hogan.template = Hogan.Template;
module.exports = Hogan;


/***/ }),

/***/ 882:
/***/ ((__unused_webpack_module, exports) => {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options || {};
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.buf = '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // ensurePartial
    ep: function(symbol, partials) {
      var partial = this.partials[symbol];

      // check to see that if we've instantiated this partial before
      var template = partials[partial.name];
      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }
        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      }

      // We use this to check whether the partials dictionary has changed
      this.partials[symbol].base = template;

      if (partial.subs) {
        // Make sure we consider parent template now
        if (!partials.stackText) partials.stackText = {};
        for (key in partial.subs) {
          if (!partials.stackText[key]) {
            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
          }
        }
        template = createSpecializedPartial(template, partial.subs, partial.partials,
          this.stackSubs, this.stackPartials, partials.stackText);
      }
      this.partials[symbol].instance = template;

      return template;
    },

    // tries to find a partial in the current scope and render it
    rp: function(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);
      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var found,
          names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          doModelGet = this.options.modelGet,
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        val = ctx[ctx.length - 1];
      } else {
        for (var i = 1; i < names.length; i++) {
          found = findInScope(names[i], val, doModelGet);
          if (found !== undefined) {
            cx = val;
            val = found;
          } else {
            val = '';
          }
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false,
          doModelGet = this.options.modelGet;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        val = findInScope(key, v, doModelGet);
        if (val !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ls: function(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;

      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;

      return false;
    },

    // compile text
    ct: function(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }
      return this.c.compile(text, this.options).render(cx, partials);
    },

    // template result buffering
    b: function(s) { this.buf += s; },

    fl: function() { var r = this.buf; this.buf = ''; return r; },

    // method replace section
    ms: function(func, ctx, partials, inverted, start, end, tags) {
      var textSource,
          cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
        }
      }

      return result;
    },

    // method replace variable
    mv: function(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },

    sub: function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        this.activeSub = name;
        f(context, partials, this, indent);
        this.activeSub = false;
      }
    }

  };

  //Find a key in an object
  function findInScope(key, scope, doModelGet) {
    var val;

    if (scope && typeof scope == 'object') {

      if (scope[key] !== undefined) {
        val = scope[key];

      // try lookup with get for backbone or similar model data
      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
        val = scope.get(key);
      }
    }

    return val;
  }

  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.subsText = {};  //hehe. substext.
    partial.buf = '';

    stackSubs = stackSubs || {};
    partial.stackSubs = stackSubs;
    partial.subsText = stackText;
    for (key in subs) {
      if (!stackSubs[key]) stackSubs[key] = subs[key];
    }
    for (key in stackSubs) {
      partial.subs[key] = stackSubs[key];
    }

    stackPartials = stackPartials || {};
    partial.stackPartials = stackPartials;
    for (key in partials) {
      if (!stackPartials[key]) stackPartials[key] = partials[key];
    }
    for (key in stackPartials) {
      partial.partials[key] = stackPartials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})( true ? exports : 0);


/***/ }),

/***/ 742:
/***/ ((module) => {


module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};


/***/ }),

/***/ 153:
/***/ (function(__unused_webpack_module, exports) {

!function(e,n){ true?n(exports):0}(this,function(e){"use strict";function n(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function t(e,n){return e(n={exports:{}},n.exports),n.exports}var r=t(function(e,n){function t(){}function r(e,n,t,r,i){for(var o=0,f=n.length,s=0,a=0;o<f;o++){var u=n[o];if(u.removed){if(u.value=r.slice(a,a+u.count).join(""),a+=u.count,o&&n[o-1].added){var c=n[o-1];n[o-1]=n[o],n[o]=c}}else{if(!u.added&&i){var l=t.slice(s,s+u.count);l=l.map(function(e,n){var t=r[a+n];return t.length>e.length?t:e}),u.value=l.join("")}else u.value=t.slice(s,s+u.count).join("");s+=u.count,u.added||(a+=u.count)}}var d=n[f-1];return f>1&&(d.added||d.removed)&&e.equals("",d.value)&&(n[f-2].value+=d.value,n.pop()),n}n.__esModule=!0,n.default=t,t.prototype={diff:function(e,n){var t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],i=t.callback;"function"==typeof t&&(i=t,t={}),this.options=t;var o=this;function f(e){return i?(setTimeout(function(){i(void 0,e)},0),!0):e}e=this.castInput(e),n=this.castInput(n),e=this.removeEmpty(this.tokenize(e));var s=(n=this.removeEmpty(this.tokenize(n))).length,a=e.length,u=1,c=s+a,l=[{newPos:-1,components:[]}],d=this.extractCommon(l[0],n,e,0);if(l[0].newPos+1>=s&&d+1>=a)return f([{value:n.join(""),count:n.length}]);function h(){for(var t=-1*u;t<=u;t+=2){var i=void 0,c=l[t-1],d=l[t+1],h=(d?d.newPos:0)-t;c&&(l[t-1]=void 0);var p=c&&c.newPos+1<s,v=d&&0<=h&&h<a;if(p||v){if(!p||v&&c.newPos<d.newPos?(i={newPos:(g=d).newPos,components:g.components.slice(0)},o.pushComponent(i.components,void 0,!0)):((i=c).newPos++,o.pushComponent(i.components,!0,void 0)),h=o.extractCommon(i,n,e,t),i.newPos+1>=s&&h+1>=a)return f(r(o,i.components,n,e,o.useLongestToken));l[t]=i}else l[t]=void 0}var g;u++}if(i)!function e(){setTimeout(function(){if(u>c)return i();h()||e()},0)}();else for(;u<=c;){var p=h();if(p)return p}},pushComponent:function(e,n,t){var r=e[e.length-1];r&&r.added===n&&r.removed===t?e[e.length-1]={count:r.count+1,added:n,removed:t}:e.push({count:1,added:n,removed:t})},extractCommon:function(e,n,t,r){for(var i=n.length,o=t.length,f=e.newPos,s=f-r,a=0;f+1<i&&s+1<o&&this.equals(n[f+1],t[s+1]);)f++,s++,a++;return a&&e.components.push({count:a}),e.newPos=f,s},equals:function(e,n){return e===n},removeEmpty:function(e){for(var n=[],t=0;t<e.length;t++)e[t]&&n.push(e[t]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")}}});n(r);var i=t(function(e,n){n.__esModule=!0,n.characterDiff=void 0,n.diffChars=function(e,n,t){return o.diff(e,n,t)};var t,i=(t=r)&&t.__esModule?t:{default:t};var o=n.characterDiff=new i.default});n(i);i.characterDiff,i.diffChars;var o=t(function(e,n){n.__esModule=!0,n.generateOptions=function(e,n){if("function"==typeof e)n.callback=e;else if(e)for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}});n(o);o.generateOptions;var f=t(function(e,n){n.__esModule=!0,n.wordDiff=void 0,n.diffWords=function(e,n,t){var r=(0,o.generateOptions)(t,{ignoreWhitespace:!0});return a.diff(e,n,r)},n.diffWordsWithSpace=function(e,n,t){return a.diff(e,n,t)};var t,i=(t=r)&&t.__esModule?t:{default:t};var f=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,s=/\S/,a=n.wordDiff=new i.default;a.equals=function(e,n){return e===n||this.options.ignoreWhitespace&&!s.test(e)&&!s.test(n)},a.tokenize=function(e){for(var n=e.split(/(\s+|\b)/),t=0;t<n.length-1;t++)!n[t+1]&&n[t+2]&&f.test(n[t])&&f.test(n[t+2])&&(n[t]+=n[t+2],n.splice(t+1,2),t--);return n}});n(f);f.wordDiff,f.diffWords,f.diffWordsWithSpace;var s=t(function(e,n){n.__esModule=!0,n.lineDiff=void 0,n.diffLines=function(e,n,t){return f.diff(e,n,t)},n.diffTrimmedLines=function(e,n,t){var r=(0,o.generateOptions)(t,{ignoreWhitespace:!0});return f.diff(e,n,r)};var t,i=(t=r)&&t.__esModule?t:{default:t};var f=n.lineDiff=new i.default;f.tokenize=function(e){var n=[],t=e.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var r=0;r<t.length;r++){var i=t[r];r%2&&!this.options.newlineIsToken?n[n.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),n.push(i))}return n}});n(s);s.lineDiff,s.diffLines,s.diffTrimmedLines;var a=t(function(e,n){n.__esModule=!0,n.sentenceDiff=void 0,n.diffSentences=function(e,n,t){return o.diff(e,n,t)};var t,i=(t=r)&&t.__esModule?t:{default:t};var o=n.sentenceDiff=new i.default;o.tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)}});n(a);a.sentenceDiff,a.diffSentences;var u=t(function(e,n){n.__esModule=!0,n.cssDiff=void 0,n.diffCss=function(e,n,t){return o.diff(e,n,t)};var t,i=(t=r)&&t.__esModule?t:{default:t};var o=n.cssDiff=new i.default;o.tokenize=function(e){return e.split(/([{}:;,]|\s+)/)}});n(u);u.cssDiff,u.diffCss;var c=t(function(e,n){n.__esModule=!0,n.jsonDiff=void 0;var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};n.diffJson=function(e,n,t){return a.diff(e,n,t)},n.canonicalize=u;var i,o=(i=r)&&i.__esModule?i:{default:i};var f=Object.prototype.toString,a=n.jsonDiff=new o.default;function u(e,n,r){n=n||[],r=r||[];var i=void 0;for(i=0;i<n.length;i+=1)if(n[i]===e)return r[i];var o=void 0;if("[object Array]"===f.call(e)){for(n.push(e),o=new Array(e.length),r.push(o),i=0;i<e.length;i+=1)o[i]=u(e[i],n,r);return n.pop(),r.pop(),o}if(e&&e.toJSON&&(e=e.toJSON()),"object"===(void 0===e?"undefined":t(e))&&null!==e){n.push(e),o={},r.push(o);var s=[],a=void 0;for(a in e)e.hasOwnProperty(a)&&s.push(a);for(s.sort(),i=0;i<s.length;i+=1)o[a=s[i]]=u(e[a],n,r);n.pop(),r.pop()}else o=e;return o}a.useLongestToken=!0,a.tokenize=s.lineDiff.tokenize,a.castInput=function(e){return"string"==typeof e?e:JSON.stringify(u(e),void 0,"  ")},a.equals=function(e,n){return o.default.prototype.equals(e.replace(/,([\r\n])/g,"$1"),n.replace(/,([\r\n])/g,"$1"))}});n(c);c.jsonDiff,c.diffJson,c.canonicalize;var l=t(function(e,n){n.__esModule=!0,n.parsePatch=function(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t=e.split("\n"),r=[],i=0;function o(){var e={};for(r.push(e);i<t.length;){var o=t[i];if(/^(\-\-\-|\+\+\+|@@)\s/.test(o))break;var a=/^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(o);a&&(e.index=a[1]),i++}for(f(e),f(e),e.hunks=[];i<t.length;){var u=t[i];if(/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(u))break;if(/^@@/.test(u))e.hunks.push(s());else{if(u&&n.strict)throw new Error("Unknown line "+(i+1)+" "+JSON.stringify(u));i++}}}function f(e){var n=/^(\-\-\-|\+\+\+)\s+(\S*)\s?(.*?)\s*$/.exec(t[i]);if(n){var r="---"===n[1]?"old":"new";e[r+"FileName"]=n[2],e[r+"Header"]=n[3],i++}}function s(){for(var e=i,r=t[i++],o=r.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),f={oldStart:+o[1],oldLines:+o[2]||1,newStart:+o[3],newLines:+o[4]||1,lines:[]},s=0,a=0;i<t.length;i++){var u=t[i][0];if("+"!==u&&"-"!==u&&" "!==u&&"\\"!==u)break;f.lines.push(t[i]),"+"===u?s++:"-"===u?a++:" "===u&&(s++,a++)}if(s||1!==f.newLines||(f.newLines=0),a||1!==f.oldLines||(f.oldLines=0),n.strict){if(s!==f.newLines)throw new Error("Added line count did not match for hunk at line "+(e+1));if(a!==f.oldLines)throw new Error("Removed line count did not match for hunk at line "+(e+1))}return f}for(;i<t.length;)o();return r}});n(l);l.parsePatch;var d=t(function(e,n){n.__esModule=!0,n.default=function(e,n,t){var r=!0,i=!1,o=!1,f=1;return function s(){if(r&&!o){if(i?f++:r=!1,e+f<=t)return f;o=!0}if(!i)return o||(r=!0),n<=e-f?-f++:(i=!0,s())}}});n(d);var h=t(function(e,n){n.__esModule=!0,n.applyPatch=i,n.applyPatches=function(e,n){"string"==typeof e&&(e=(0,l.parsePatch)(e));var t=0;!function r(){var o=e[t++];if(!o)return n.complete();n.loadFile(o,function(e,t){if(e)return n.complete(e);var f=i(t,o,n);n.patched(o,f),setTimeout(r,0)})}()};var t,r=(t=d)&&t.__esModule?t:{default:t};function i(e,n){var t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];if("string"==typeof n&&(n=(0,l.parsePatch)(n)),Array.isArray(n)){if(n.length>1)throw new Error("applyPatch only works with a single input.");n=n[0]}var i=e.split("\n"),o=n.hunks,f=t.compareLine||function(e,n,t,r){return n===r},s=0,a=t.fuzzFactor||0,u=0,c=0,d=void 0,h=void 0;function p(e,n){for(var t=0;t<e.lines.length;t++){var r=e.lines[t],o=r[0],u=r.substr(1);if(" "===o||"-"===o){if(!f(n+1,i[n],o,u)&&++s>a)return!1;n++}}return!0}for(var v=0;v<o.length;v++){for(var g=o[v],y=i.length-g.oldLines,m=0,w=c+g.oldStart-1,_=(0,r.default)(w,u,y);void 0!==m;m=_())if(p(g,w+m)){g.offset=c+=m;break}if(void 0===m)return!1;u=g.offset+g.oldStart+g.oldLines}for(var P=0;P<o.length;P++){var b=o[P],x=b.offset+b.newStart-1;0==b.newLines&&x++;for(var L=0;L<b.lines.length;L++){var M=b.lines[L],D=M[0],k=M.substr(1);if(" "===D)x++;else if("-"===D)i.splice(x,1);else if("+"===D)i.splice(x,0,k),x++;else if("\\"===D){var S=b.lines[L-1]?b.lines[L-1][0]:null;"+"===S?d=!0:"-"===S&&(h=!0)}}}if(d)for(;!i[i.length-1];)i.pop();else h&&i.push("");return i.join("\n")}});n(h);h.applyPatch,h.applyPatches;var p=t(function(e,n){function t(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function r(e,n,r,i,o,f,a){a||(a={context:4});var u=(0,s.diffLines)(r,i);function c(e){return e.map(function(e){return" "+e})}u.push({value:"",lines:[]});for(var l=[],d=0,h=0,p=[],v=1,g=1,y=function(e){var n=u[e],o=n.lines||n.value.replace(/\n$/,"").split("\n");if(n.lines=o,n.added||n.removed){var f;if(!d){var s=u[e-1];d=v,h=g,s&&(p=a.context>0?c(s.lines.slice(-a.context)):[],d-=p.length,h-=p.length)}(f=p).push.apply(f,t(o.map(function(e){return(n.added?"+":"-")+e}))),n.added?g+=o.length:v+=o.length}else{if(d)if(o.length<=2*a.context&&e<u.length-2){var y;(y=p).push.apply(y,t(c(o)))}else{var m,w=Math.min(o.length,a.context);(m=p).push.apply(m,t(c(o.slice(0,w))));var _={oldStart:d,oldLines:v-d+w,newStart:h,newLines:g-h+w,lines:p};if(e>=u.length-2&&o.length<=a.context){var P=/\n$/.test(r),b=/\n$/.test(i);0!=o.length||P?P&&b||p.push("\\ No newline at end of file"):p.splice(_.oldLines,0,"\\ No newline at end of file")}l.push(_),d=0,h=0,p=[]}v+=o.length,g+=o.length}},m=0;m<u.length;m++)y(m);return{oldFileName:e,newFileName:n,oldHeader:o,newHeader:f,hunks:l}}function i(e,n,t,i,o,f,s){var a=r(e,n,t,i,o,f,s),u=[];e==n&&u.push("Index: "+e),u.push("==================================================================="),u.push("--- "+a.oldFileName+(void 0===a.oldHeader?"":"\t"+a.oldHeader)),u.push("+++ "+a.newFileName+(void 0===a.newHeader?"":"\t"+a.newHeader));for(var c=0;c<a.hunks.length;c++){var l=a.hunks[c];u.push("@@ -"+l.oldStart+","+l.oldLines+" +"+l.newStart+","+l.newLines+" @@"),u.push.apply(u,l.lines)}return u.join("\n")+"\n"}n.__esModule=!0,n.structuredPatch=r,n.createTwoFilesPatch=i,n.createPatch=function(e,n,t,r,o,f){return i(e,e,n,t,r,o,f)}});n(p);p.structuredPatch,p.createTwoFilesPatch,p.createPatch;var v=t(function(e,n){n.__esModule=!0,n.convertChangesToDMP=function(e){for(var n=[],t=void 0,r=void 0,i=0;i<e.length;i++)t=e[i],r=t.added?1:t.removed?-1:0,n.push([r,t.value]);return n}});n(v);v.convertChangesToDMP;var g=t(function(e,n){function t(e){var n=e;return n=(n=(n=(n=n.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).replace(/"/g,"&quot;")}n.__esModule=!0,n.convertChangesToXML=function(e){for(var n=[],r=0;r<e.length;r++){var i=e[r];i.added?n.push("<ins>"):i.removed&&n.push("<del>"),n.push(t(i.value)),i.added?n.push("</ins>"):i.removed&&n.push("</del>")}return n.join("")}});n(g);g.convertChangesToXML;var y=t(function(e,n){n.__esModule=!0,n.canonicalize=n.convertChangesToXML=n.convertChangesToDMP=n.parsePatch=n.applyPatches=n.applyPatch=n.createPatch=n.createTwoFilesPatch=n.structuredPatch=n.diffJson=n.diffCss=n.diffSentences=n.diffTrimmedLines=n.diffLines=n.diffWordsWithSpace=n.diffWords=n.diffChars=n.Diff=void 0;var t,o=(t=r)&&t.__esModule?t:{default:t};n.Diff=o.default,n.diffChars=i.diffChars,n.diffWords=f.diffWords,n.diffWordsWithSpace=f.diffWordsWithSpace,n.diffLines=s.diffLines,n.diffTrimmedLines=s.diffTrimmedLines,n.diffSentences=a.diffSentences,n.diffCss=u.diffCss,n.diffJson=c.diffJson,n.structuredPatch=p.structuredPatch,n.createTwoFilesPatch=p.createTwoFilesPatch,n.createPatch=p.createPatch,n.applyPatch=h.applyPatch,n.applyPatches=h.applyPatches,n.parsePatch=l.parsePatch,n.convertChangesToDMP=v.convertChangesToDMP,n.convertChangesToXML=g.convertChangesToXML,n.canonicalize=c.canonicalize});n(y);y.canonicalize,y.convertChangesToXML,y.convertChangesToDMP,y.parsePatch,y.applyPatches,y.applyPatch,y.createPatch,y.createTwoFilesPatch,y.structuredPatch,y.diffJson,y.diffCss,y.diffSentences,y.diffTrimmedLines,y.diffLines,y.diffWordsWithSpace,y.diffWords,y.diffChars,y.Diff;function m(e,n){let t=0;for(let r=0;r<e.length;r++)switch(e[r].type){case P:t+=n[0];break;case _:t+=n[1];break;case b:t++;break;default:throw Error("unknown change type: "+e[r].type)}return t}function w(e,n,t){this.changes=t,this.aoff=e,this.boff=n,this._alen=-1,this._blen=-1}Object.defineProperty(w.prototype,"alen",{get:function(){return-1===this._alen?this._alen=m(this.changes,[1,0]):this._alen}}),Object.defineProperty(w.prototype,"blen",{get:function(){return-1===this._blen?this._blen=m(this.changes,[0,1]):this._blen}}),w.prototype.unified=function(){let e=[this.unifiedHeader()];return this.changes.forEach(function(n){e.push(n.unified())}),e.join("\n")},w.prototype.unifiedHeader=function(){let e=1===this.alen?"":","+this.alen,n=1===this.blen?"":","+this.blen,t=0===this.alen?0:1,r=0===this.blen?0:1;return"@@ -"+(this.aoff+t)+e+" +"+(this.boff+r)+n+" @@"},w.prototype.shorthand=function(){return this.changes.reduce(function(e,n){return e+n.type},"")},w.prototype.toString=function(){return"{"+this.shorthand()+"} "+this.unifiedHeader()};const _="+",P="-",b="s";function x(e){return"s"===e?" ":e}function L(e,n){this.type=e,this.text=n}function M(e,n){if(0===n)return[];let t=[],r=e.value;if(void 0===n)(t=r.split("\n"))[t.length-1]||t.pop();else if(n>0){let e=k(r,"\n",0,n,!1);t=r.substring(0,e).split("\n")}else{let e="\n"===r[r.length-1]?r.length-1:r.length,i=k(r,"\n",e-1,-n,!0);t=r.substring(i+1,e).split("\n")}return t.map(function(n){return new L(e.type,n)})}function D(e,n){return Array.prototype.push.apply(n,e),n}function k(e,n,t,r,i){let o=i?-1:1;t-=o;for(let f=0;f<r;f++)t=i?e.lastIndexOf(n,t+o):e.indexOf(n,t+o);return t}L.prototype.unified=function(){return x(this.type)+this.text},L.prototype.toString=function(){return this.unified()};var S={hunk:function(e,n,t){return new w(e,n,t)},linechange:function(e,n){return new L(e,n)},lineChanges:M,change2string:function(e,n){n=n||60;let t=e.count+": "+x(e.type),r=Math.min(n-t.length,e.value.length-1);return t+(e.value.substring(0,r).replace(/\n/g,",")+(e.value.length>r+1?"...":""))},changes2shorthand:function(e){return"{"+e.reduce(function(e,n){for(let t=0;t<n.count;t++)e+=n.type;return e},"")+"}"},nthIndexOf:k,makeHunks:function(e,n,t){let r=[],i=[],o=0;function f(){if(i.length){let e=o,n=o;if(r.length){let t=r[r.length-1];e+=t.aoff+t.alen,n+=t.boff+t.blen}r.push(new w(e,n,i)),i=[],o=0}}for(let r=0;r<e.length;r++){let s=e[r];if(s.type===b){let a=r>0?t:0,u=r<e.length-1?n:0,c=Math.max(s.count-(a+u),0);c>0?(D(M(s,a),i),f(),D(M(s,-u),i),o=c):D(M(s),i)}else D(M(s),i)}return f(),r},ADDED:_,REMOVED:P,UNMODIFIED:b},C=t(function(e,n){function t(e){return e.added?S.ADDED:e.removed?S.REMOVED:S.UNMODIFIED}function r(e,n){!function(e){0===e.length||(e[0].type=t(e[0]),e.reduce(function(e,n,r){if(n.type=t(n),e.type===n.type)throw Error("repeating change types are not handled: "+e.type+" (at "+(r-1)+" and "+r+")");return n}))}(e),(n=n||{}).aname=n.aname||"a",n.bname=n.bname||"b";let r=n.context||0===n.context?n.context:0;n.pre_context=n.pre_context||0===n.pre_context?n.pre_context:r,n.post_context=n.post_context||0===n.post_context?n.post_context:r;let i=S.makeHunks(e,n.pre_context,n.post_context);if(i.length){let e=[];return e.push("--- "+n.aname),e.push("+++ "+n.bname),i.forEach(function(n){e.push(n.unified())}),e.join("\n")}return""}function i(e,n,t){e=Array.isArray(e)?e.join("\n")+"\n":e,n=Array.isArray(n)?n.join("\n")+"\n":n;let r=y.diffLines(e,n,t);return 1!==r.length||r[0].added||r[0].removed?r:[]}function o(e,n,t){return r(i(e,n),t)}n.assertEqual=function(e,n,t,r,i){i=i||console.log,t=t.ok||t;let f=o(e,n,{context:3,aname:r+" (actual)",bname:r+" (expected)"});t(!f,r),f&&f.split("\n").forEach(function(e){i("  "+e)})},n.diffAsText=o,n.formatLines=r,n.diffLines=i,Object.keys(y).forEach(function(e){n[e]||(n[e]=y[e])})}),T=C.assertEqual,E=C.diffAsText,O=C.formatLines,j=C.diffLines;e.default=C,e.assertEqual=T,e.diffAsText=E,e.formatLines=O,e.diffLines=j,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/flowbite/dist/flowbite.js
var flowbite = __webpack_require__(730);
;// CONCATENATED MODULE: ./src/diffViewer.js
const Diff2html = __webpack_require__(504);



const unidiff = __webpack_require__(153);

const diffViewer_elements = document.querySelectorAll("div[id^=\"diff-data\"]");
diffViewer_elements.forEach(element => {
  const actual = JSON.parse(element.dataset.actual);
  const expected = JSON.parse(element.dataset.expected);
  const name = element.dataset.name;
  var diff = unidiff.formatLines(unidiff.diffLines(JSON.stringify(actual, null, 2), JSON.stringify(expected, null, 2)), {
    aname: "actual - ".concat(name),
    bname: "expected - ".concat(name)
  });

  if (diff) {
    const diffJson = Diff2html.parse(diff);
    const diffHtml = Diff2html.html(diffJson, {
      outputFormat: 'side-by-side',
      matching: 'words'
    });
    element.innerHTML = diffHtml;
  } else {
    element.innerHTML = "\n        <div class=\"flex justify-center w-full mt-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800\" role=\"alert\">\n                 No Diff Found\n         </div>\n         ";
  }
});
const responseElements = document.querySelectorAll("code[id^=\"response-modal\"]");
responseElements.forEach(element => {
  const response = JSON.parse(element.dataset.json);
  element.innerHTML = JSON.stringify(response, null, '\t');
});
// EXTERNAL MODULE: ./node_modules/copy-html-to-clipboard/index.js
var copy_html_to_clipboard = __webpack_require__(399);
var copy_html_to_clipboard_default = /*#__PURE__*/__webpack_require__.n(copy_html_to_clipboard);
;// CONCATENATED MODULE: ./src/copy-to-clipboard.js


const toast = curl => "<div class=\" border border-gray-700 dark:border-gray-500 flex p-4 mb-4 text-sm text-gray-700 bg-gray-400 rounded-lg dark:bg-gray-900 dark:text-gray-500\" role=\"alert\">\n<svg aria-hidden=\"true\" class=\"flex-shrink-0 inline w-5 h-5 mr-3\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z\" clip-rule=\"evenodd\"></path></svg>\n<span class=\"sr-only\">Info</span>\n<div>\n  <span class=\"font-medium\">Command copied!</span> ".concat(curl, "\n</div>\n</div>");

const copy_to_clipboard_elements = document.querySelectorAll("button[id^=\"curl-\"]");
copy_to_clipboard_elements.forEach(element => {
  element.addEventListener('click', function () {
    const curl = element.dataset.curl;
    const elementId = element.id.split('-')[1];
    const toastElement = document.getElementById("curl-toast-".concat(elementId)); // decode from base64

    const decoded = atob(curl);
    copy_html_to_clipboard_default()(decoded);
    toastElement.innerHTML = toast(decoded);
    setTimeout(() => {
      toastElement.innerHTML = '';
    }, 2000);
  });
});
;// CONCATENATED MODULE: ./src/app.js



 // Have the courage to follow your heart and intuition.
})();

/******/ })()
;
//# sourceMappingURL=app.bundle.js.map