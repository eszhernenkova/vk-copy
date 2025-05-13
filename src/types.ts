
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SetStateAction, Dispatch } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export interface IUser {
    _id: string,
    avatar: string,
    name: string,
    isInNetwork?: boolean
}

export interface IPost {
    author: IUser,
    createdAt: string,
    content: string,
    images?: string[]
}

export interface IMenuItem {
    tittle: string,
    link: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}