const Diff2html = require('diff2html');
import 'diff2html/bundles/css/diff2html.min.css';
const unidiff = require('unidiff');

const elements = document.querySelectorAll(`div[id^="diff-data"]`);
elements.forEach(element => {
    const actual = JSON.parse(element.dataset.actual);
    const expected = JSON.parse(element.dataset.expected);
    const name = element.dataset.name;
    var diff = unidiff.formatLines(unidiff.diffLines(JSON.stringify(actual, null, 2), JSON.stringify(expected, null, 2)),
        { aname: `actual - ${name}`, bname: `expected - ${name}` });
    if (diff) {
        const diffJson = Diff2html.parse(diff);
        const diffHtml = Diff2html.html(diffJson,
            { outputFormat: 'side-by-side', matching: 'words' }
        );
        element.innerHTML = diffHtml;
    } else {
        element.innerHTML = `
        <div class="flex justify-center w-full mt-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                 No Diff Found
         </div>
         `;
    }
});

const responseElements = document.querySelectorAll(`code[id^="response-modal"]`);
responseElements.forEach(element => {
    const response = JSON.parse(element.dataset.json);
    element.innerHTML = JSON.stringify(response, null, '\t');
});