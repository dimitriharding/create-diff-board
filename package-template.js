const zipper = require('zip-local');
zipper.sync.zip("./static-template").compress().save("static-template.zip");