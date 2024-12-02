import { ref, onMounted, onUnmounted } from 'vue';

export function useBreakpoint(breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 }) {
  const currentBreakpoint = ref('');

  const getBreakpoint = () => {
    if (typeof window === 'undefined') return 'xs'; // For SSR by default
    const width = window.innerWidth;

    if (width < breakpoints.sm) return 'xs';
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    if (width < breakpoints.xl) return 'lg';
    return 'xl';
  };

  const updateBreakpoint = () => {
    currentBreakpoint.value = getBreakpoint();
  };

  // Executes only on client side
  onMounted(() => {
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint);
  });
  
  const is = (size: string) => currentBreakpoint.value === size;
  const isAbove = (size: string) => {
    const sizes = Object.keys(breakpoints).concat(['xl']);
    return sizes.indexOf(currentBreakpoint.value) >= sizes.indexOf(size);
  };

  return { currentBreakpoint, is, isAbove };
}
// A usage example for this composable is in the useBreakpoints.vue file.
