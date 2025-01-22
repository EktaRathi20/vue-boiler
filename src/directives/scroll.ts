export default {
    mounted(el: any, binding: any) {
        const onScroll = () => {
            if (window.scrollY + window.innerHeight >= el.offsetTop) {
                binding.value();
            }
        };
        window.addEventListener('scroll', onScroll);
        el._onScroll = onScroll;
    },
    unmounted(el: any) {
        window.removeEventListener('scroll', el._onScroll);
        delete el._onScroll;
    }
};