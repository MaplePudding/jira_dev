export interface AuthContextType {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  data: any;
  isSuccess: boolean;
  isIdle: boolean;
  refetch: () => void;
}
