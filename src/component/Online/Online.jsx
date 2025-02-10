import useOnline from "../../hooks/useOnline";

export default function Online({ childern }) {
  let isOnline = useOnline();
  if (isOnline) {
    return childern;
  }
}
