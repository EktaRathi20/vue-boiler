import type { DirectiveBinding } from 'vue';

export default {
    beforeMount(el: HTMLElement, binding: DirectiveBinding) {
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';

        input.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                binding.value(file);
            }
        });

        el.addEventListener('click', () => {
            input.click();
        });

        el.appendChild(input);
    },
};