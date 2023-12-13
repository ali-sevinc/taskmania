import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TagItem from "./TagItem";

export default function UserTags() {
  const users = useSelector((state: RootState) => state.user.users);
  const loggedUser = users.find((user) => user.isLogin);
  if (!loggedUser) return <p>Have no tag.</p>;
  return (
    <nav>
      <ul>
        {loggedUser.customTags?.map((tag) => <TagItem tag={tag} key={tag} />)}
      </ul>
    </nav>
  );
}
