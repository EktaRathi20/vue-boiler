import { type App } from 'vue';
import focusDirective from '@/directives/focus';
import scrollDirective from '@/directives/scroll';
import clickOutsideDirective from '@/directives/click-outside';
import fileUploadDirective from '@/directives/file-upload';

export default {
    install(app: App) {
        app.directive('focus', focusDirective);
        app.directive('scroll', scrollDirective);
        app.directive('click-outside', clickOutsideDirective);
        app.directive('file-upload', fileUploadDirective);
    }
};