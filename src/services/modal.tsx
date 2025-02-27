import { useSearchParams } from "next/navigation";

const useIsModalVisible = (): string | null => {
  return useSearchParams().get("show");
};

const modal = {
  useIsModalVisible,
};

export default modal;
