import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { hide } from '../../redux/reducers/modalReducer'
import { setUserRedux } from '../../redux/reducers/userReducer'
import { storage, db } from '../../firebase/config'
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import Modal from './Modal'
import userImage from '../../assets/images/user.png'

const ModalImage = () => {

    const user = useSelector(state => state.user.userData)
    const dispatch = useDispatch()

    const handleOnchangeImage = async (file) => {

        try {
            if (user.photoPath) {
                await deleteObject(ref(storage, user.photoPath))
            }

            const imageRef = ref(storage, `avatar/${new Date().getTime()}-${file.name}`)
            const snap = await uploadBytes(imageRef, file)
            const photoURL = await getDownloadURL(ref(storage, snap.ref.fullPath))
            const photoPath = snap.ref.fullPath

            const userRef = doc(db, 'users', user.id)
            await updateDoc(userRef, {
                ...user,
                photoURL,
                photoPath
            })
            dispatch(setUserRedux({ ...user, photoPath, photoURL }))
            dispatch(hide('MODAL_IMAGE'))
        } catch (error) {
            console.log(error)
        }

    }

    const handleDeleteImage = async () => {
        if (user.photoPath) {
            await deleteObject(ref(storage, user.photoPath))
            const userRef = doc(db, 'users', user.id)
            await updateDoc(userRef, {
                ...user,
                photoURL: "",
                photoPath: ""
            })
            dispatch(setUserRedux({ ...user, photoURL: "", photoPath: "" }))
            dispatch(hide('MODAL_IMAGE'))
        }
    }

    const handleHideModal = () => {
        dispatch(hide('MODAL_IMAGE'))
    }
    return (
        <Modal>
            <div className='w-[400px] rounded-xl bg-primary-bg flex flex-col items-center justify-center'>
                <div className='w-full flex flex-col items-center justify-center border-b-[1px] border-border-color'>
                    <img
                        src={user.photoURL || userImage}
                        alt=""
                        className='w-[56px] h-[56px] rounded-full my-2'
                    />
                    <p className='text-lg text-primary-text font-bold p-0'>Synced profile photo</p>
                    <span className='text-base text-gray-text font-normal mb-2'>Instagram, Facebook</span>
                </div>
                <div className='w-full py-3 border-b-[1px] border-border-color text-base font-bold text-blue-text'>
                    <label htmlFor="image" className='text-center w-full  cursor-pointer block'>Upload Photo</label>
                    <input
                        type="file"
                        id="image"
                        hidden={true}
                        onChange={(e) => handleOnchangeImage(e.target.files[0])}
                    />
                </div>
                <a href="https://accountscenter.instagram.com/profiles/100012719312817/photo/manage/"
                    className='w-full block text-center py-3 border-b-[1px] border-border-color text-base font-normal text-primary-text'
                >
                    Manage Sync Settings
                </a>
                <button
                    className='w-full py-3 border-b-[1px] border-border-color text-base font-bold text-red-color'
                    onClick={handleDeleteImage}
                >
                    Remove Current Photo
                </button>
                <span className='w-full text-center py-3  text-base font-normal text-primary-text cursor-pointer'
                    onClick={handleHideModal}
                >
                    Cancel
                </span>
            </div>
        </Modal>
    )
}

export default ModalImage