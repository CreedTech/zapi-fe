//changes made to the component by TAIWO
//1.) made the placeholder optional to make the component flexible 
//2.) added a className option for styling purposes
//3.) conditionals for if placeholder is true or false


import React, { ChangeEvent } from "react";
import { makeStyles } from "@mui/styles";
import { SearchOutlined } from "@mui/icons-material";

interface InputProps {
    type: string
    name: string
    value?: string | number | undefined
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onSelect?: (e: ChangeEvent<HTMLSelectElement>) => void
    placeholder?: string
    data?: Array<any>
    className?: string
}

const InputSearch: React.FC<InputProps> = ({type,name,value,onChange,onSelect,placeholder,data,className}) => {
    // const classes = useStyles()

    if(type === "select") {
        return (
            <div className={className}>
                {placeholder ? 
                <select name={name} value={value} onChange={onSelect}>
                    <option value="">{placeholder}</option>
                    {data?.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select> 
                : 
                <select name={name} value={value} onChange={onSelect}>
                    {data?.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                }
            </div>
        )
    }

  return (
    <div className={className}>
        <SearchOutlined />
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}  />
    </div>
  )
}
// commented this out to make the component reusable so we can apply different stylings if needed.
// const useStyles = makeStyles({
//     formControl: {
//         height: 45,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: "1rem",
//         background: "#FFF",
//         padding: "0.25rem 1rem",
//         margin: "1rem 0",
//         borderRadius: 5,
//         "& input": {
//             width: 250,
//             height: "100%",
//             outline: "none",
//             border: "none",
//         },
//         "& select": {
//             width: 100,
//             height: "100%",
//             outline: "none",
//             border: "none",
//         }
//     }
// })

export default InputSearch