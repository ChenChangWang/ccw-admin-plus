import { ref, Ref } from "vue";

export default function useLoading(
  defValue = false,
): [Ref<boolean>, (value: boolean) => void, () => void] {
  const loading: Ref<boolean> = ref(defValue);
  const setLoading = (value: boolean): void => {
    loading.value = value;
  };
  const toggleLoading = () => {
    loading.value = !loading.value;
  };
  return [loading, setLoading, toggleLoading];
}
