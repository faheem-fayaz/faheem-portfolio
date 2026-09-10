import type {HTMLAttributes} from "react"; export function Badge({className="",...p}:HTMLAttributes<HTMLDivElement>){return <div className={`inline-flex items-center ${className}`} {...p}/>}
