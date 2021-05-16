
export default function useUtils() {
  const getMsg = (status, name, suffix_msg) => {
    if (status == 200) {
      return `${name} has been ${suffix_msg}!`;
    } else {
      return 'There has been some error!';
    }
  }

  return {
    getMsg
  }
}