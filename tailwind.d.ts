declare module 'tailwindcss/lib/util/flattenColorPalette' {
    import { TailwindConfig } from 'tailwindcss/tailwind-config';
    const flattenColorPalette: (colors: TailwindConfig['theme']['colors']) => Record<string, string>;
    export default flattenColorPalette;
}
