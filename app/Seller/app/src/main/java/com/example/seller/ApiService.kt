package com.example.seller

import android.widget.Toast
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.PartMap


interface ApiService {

    @Multipart
    @POST("/api/add")

     fun uploadFile(

    @Part image: MultipartBody.Part

    ): Call<ResponseBody>


}



