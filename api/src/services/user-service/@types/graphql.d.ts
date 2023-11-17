import { GraphQlTypename } from "../../../@types/graphql";
import { ErrorData } from "../../common/errorData";
import { UserData } from "./user.schema"

type UserDataOrError = (UserData | ErrorData) & GraphQlTypename;
type UsersDataOrError = (UsersData | ErrorData) & GraphQlTypename;
