[Source : sass-guideline the 7-1 Pattern](https://sass-guidelin.es/#architecture "Cliquez pour aller sur la page")

## COMPONENTS FOLDER AND LAYOUT FOLDER

>While layout/ is macro (defining the global wireframe), components/ is more focused on widgets.

***

## PAGES FOLDER

>If you have page-specific styles, it is better to put them in a pages/ folder, in a file named after the page.

***

## THEMES FOLDER

>On large sites and applications, it is not unusual to have different themes.

***

## ABSTRACTS FOLDER

>The rule of thumb for this folder is that it should not output a single line of CSS when compiled on its own. These are nothing but Sass helpers.

*When working on a very large project with a lot of abstract utilities, it might be interesting to group them by topic rather than type, for instance typography (_typography.scss), theming (_theming.scss), etc. Each file contains all the related helpers: variables, functions, mixins and placeholders. Doing so can make the code easier to browse and maintain, especially when files are getting very long.*

*Might also be called **utilities/** or **helpers/***

***

## VENDORS FOLDER

>most projects will have a vendors/ folder containing all the CSS files from external libraries and frameworks. Putting those aside in the same folder is a good way to say “Hey, this is not from me, not my code, not my responsibility”.

*If you have to override a section of any vendor, I recommend you have an 8th folder called vendors-extensions/ in which you may have files named exactly after the vendors they overwrite.*

***

### MAIN.SCSS

>This file should not contain anything but @import and comments.

**Be carefull :** import the files/folders in the right order  
*Abstracts, Vendors, Base, Layout, Components, Pages, Themes*