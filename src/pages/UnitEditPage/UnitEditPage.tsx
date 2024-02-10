import "./UnitEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useUnit} from "../../hooks/units/useUnit";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const UnitEditPage = () => {

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {
        unit,
        fetchUnit,
        setName,
        setDescription,
        updateUnitImage
    } = useUnit()

    useEffect(() => {
        id && fetchUnit(id)

        return () => {
            setImgFile(undefined)
        }
    }, [])

    useEffect(() => {
        unit && setImgPreview("http://127.0.0.1:9000/" + unit.imgUrl)
    }, [unit])

    const [img_file, setImgFile] = useState<File | undefined>(undefined)
    const [img_preview, setImgPreview] = useState<string>()

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgPreview(URL.createObjectURL(img))
        }
    }

    const saveUnit = async() => {
        let form_data = new FormData()

        form_data.append('name', unit.name)
        form_data.append('description', unit.description)

        const response = await api.put(`units/${unit.id}/update/`, form_data)

        if (response.status == 200) {
            await updateUnitImage(id, img_file)
            navigate("/units/")
        }
    }

    const deleteUnit = async () => {

        const response = await api.delete(`units/${unit.id}/delete/`)

        if (response.status == 200) {
            navigate("/units/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (unit == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={img_preview} alt=""/>

                <UploadButton handleFileChange={handleFileChange}>
                    Изменить фото
                </UploadButton>

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={unit.name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={unit.description} setValue={setDescription} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveUnit}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteUnit}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default UnitEditPage