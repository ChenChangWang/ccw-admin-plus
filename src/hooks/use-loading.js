import { ref } from "vue";
export default function useLoading(defValue = false) {
  const loading = ref(defValue);
  const setLoading = (value) => {
    loading.value = value;
  };
  const toggleLoading = () => {
    loading.value = !loading.value;
  };
  return [loading, setLoading, toggleLoading];
}
