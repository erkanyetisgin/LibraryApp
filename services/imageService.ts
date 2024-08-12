import * as FileSystem from 'expo-file-system';
import {decode} from 'base64-arraybuffer';
import { supabase } from '@/lib/supabase';
import { supabaseUrl } from '@/constants';


export const getUserImageSrc = (imagePath: any) => {
    if (imagePath) {
        return getSupabaseFileUrl(imagePath);
    } else {
        return require('../assets/images/defaultUser.jpg');
    }
}

export const getSupabaseFileUrl = (filePath: any) =>{
    if(filePath){
        return {uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
    }else{
        return null
    }
        
}

export const uploadFile = async (folderName: any, fileUri: any,isImage:boolean=true) => {
    try {
        let fileName = getFilePath(folderName,isImage)
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, { 
            encoding: FileSystem.EncodingType.Base64 });

        let imageData = decode(fileBase64);

        let {data,error} = await supabase
        .storage
        .from('uploads')
        .upload(fileName, imageData, {
            cacheControl: '3600',
            upsert: false,
            contentType: isImage?'image/*':'video/*',
        });

        if (error) {
            console.error('Dosya yükleme hatası:', error);
            return {success:false,msg:error.message};
        }

        return {success:true,data:data?.path};
        
    } catch (error:any) {
        console.error('Dosya yükleme hatası:', error);
        return {success:false,msg:error.message};
        
    }
}

export const getFilePath = (folderName: any,isImage:boolean=true) => {
    return `/${folderName}/${(new Date()).getTime()}${isImage?'.jpg':'.mp4'}`;
}
