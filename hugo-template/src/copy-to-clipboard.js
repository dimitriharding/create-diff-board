import copy from 'copy-html-to-clipboard';

const toast = (curl) => `<div class=" border border-gray-700 dark:border-gray-500 flex p-4 mb-4 text-sm text-gray-700 bg-gray-400 rounded-lg dark:bg-gray-900 dark:text-gray-500" role="alert">
<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
<span class="sr-only">Info</span>
<div>
  <span class="font-medium">Command copied!</span> ${curl}
</div>
</div>`

const elements = document.querySelectorAll(`button[id^="curl-"]`);
elements.forEach(element => {
    element.addEventListener('click', function () {

        const curl = element.dataset.curl;
        const elementId = element.id.split('-')[1];
        const toastElement = document.getElementById(`curl-toast-${elementId}`);
        // decode from base64
        const decoded = atob(curl);
        copy(decoded);
        toastElement.innerHTML = toast(decoded);
        setTimeout(() => {
            toastElement.innerHTML = '';
        }, 2000);
    });
});