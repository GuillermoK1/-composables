import { ref, onMounted, onUnmounted } from 'vue';

export function useBreakpoint(breakpoints = { xs:360, sm: 640, md: 768, lg: 1024, xl: 1280 }) {
  const currentBreakpoint = ref('');

  // Función para obtener el breakpoint actual
  const getBreakpoint = () => {
    if (typeof window === 'undefined') return 'xs'; // Por defecto para SSR
    const width = window.innerWidth;

    if (width < breakpoints.xs) return '2xs';
    if (width < breakpoints.sm) return 'xs';
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    if (width < breakpoints.xl) return 'lg';
    return 'xl';
  };

  // Función para actualizar el breakpoint
  const updateBreakpoint = () => {
    currentBreakpoint.value = getBreakpoint();
  };

  // Ejecutar solo en el cliente
  onMounted(() => {
    updateBreakpoint(); // Inicializar el estado
    window.addEventListener('resize', updateBreakpoint);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint);
  });

  // Métodos auxiliares
  const is = (size: string) => currentBreakpoint.value === size;
  const isAbove = (size: string) => {
    const sizes = Object.keys(breakpoints).concat(['xl']);
    return sizes.indexOf(currentBreakpoint.value) >= sizes.indexOf(size);
  };  
  const isUnder = (size: string) => {
    const sizes = Object.keys(breakpoints).concat(['xl']);
    return sizes.indexOf(currentBreakpoint.value) <= sizes.indexOf(size);
  };

  return { currentBreakpoint, is, isAbove, isUnder };
}
// A usage example for this composable is in the useBreakpoints.vue file.
