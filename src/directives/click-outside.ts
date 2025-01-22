export default {
    beforeMount(el: any, binding: any) {
        el._clickOutsideHandler = (event: any) => {
            if (!el.contains(event.target)) {
                binding.value(event);
            }
        };
        document.addEventListener('click', el._clickOutsideHandler);
    },
    unmounted(el: any) {
        document.removeEventListener('click', el._clickOutsideHandler);
        delete el._clickOutsideHandler;
    }
};