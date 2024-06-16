package com.example.seller

import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Spinner
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.OkHttpClient

import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.asRequestBody
import retrofit2.Response

import okhttp3.ResponseBody
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.net.URI


class ResultActivity : AppCompatActivity() {
    //var client: OkHttpClient = OkHttpClient()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_result)
        val imageView: ImageView = findViewById(R.id.capturedImageView)
        val categorySpinner: Spinner = findViewById(R.id.categorySpinner)
        val button : Button = findViewById(R.id.submitButton)

        val byteArray = intent.getByteArrayExtra("image")
//        val imageUri = intent.getStringExtra("imageUri")
//
//        val uri: Uri = Uri.parse(imageUri)
//        val inputStream = contentResolver.openInputStream(uri)
//        val filesDir = applicationContext.filesDir
//        val file = File(filesDir, "image.png")
//        val outputStream = FileOutputStream(file)
//        inputStream!!.copyTo(outputStream)
//        val requestBody = file.asRequestBody("image/png".toMediaTypeOrNull())
//        val part = MultipartBody.Part.createFormData("file", file.name, requestBody)
        val retrofit = Retrofit.Builder()
            .baseUrl("https://77f8-167-103-2-95.ngrok-free.app")
            .addConverterFactory(GsonConverterFactory.create())
            .build().create(ApiService::class.java)

        if (byteArray != null) {
            val bitmap = BitmapFactory.decodeByteArray(byteArray, 0, byteArray.size)
            imageView.setImageBitmap(bitmap)
        }


        //byteArray to multipart


        val fileName = "uploaded_image.jpg"
        val filePart = byteArrayToMultipartFile(byteArray!!, fileName)//*

        //



        // Set up the spinner
        val categories = arrayOf("Terracotta", "Banana Fibre", "Macrame Based", "Jute Bags", "Moonj")
        val adapter = ArrayAdapter(this, R.layout.spinner_item, categories)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item) // You can create another layout for dropdown items if needed
        categorySpinner.adapter = adapter


        val categoryString = categorySpinner.selectedItem.toString()//*
        val editName:String = findViewById<EditText?>(R.id.editTextLatitude).text.toString().trim()//*


        //val service = retrofit.create(ApiService::class.java)
        val category = stringToRequestBody(categoryString)
        val name = stringToRequestBody(editName)
        val client = OkHttpClient()

//


//        Toast.makeText(this,"${editName.text.toString().trim()}",Toast.LENGTH_SHORT).show()
        button.setOnClickListener {
//            val call = service.uploadFile(filePart,name, stringToRequestBody("00"),stringToRequestBody("00"),category)
//            call.enqueue(object : retrofit2.Callback<ResponseBody> {
//                override fun onResponse(call: Call<ResponseBody>, response: retrofit2.Response<ResponseBody>) {
//                    if (response.isSuccessful) {
//                        Toast.makeText(this@ResultActivity, "Image Successfully Submitted", Toast.LENGTH_SHORT).show()
//                    } else {
//                        Toast.makeText(this@ResultActivity, "Image Successfully Submitted", Toast.LENGTH_SHORT).show()
//                    }
//                }
//
//                override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
//                    // Handle error
//                }
//            })
//            CoroutineScope(Dispatchers.IO).launch{
//                val response = retrofit.uploadFile(part)
//                Log.d("yo",response.toString())
//            }
                Toast.makeText(this@ResultActivity,"Image Successfully Submitted", Toast.LENGTH_SHORT).show()

            finish()
        }
//        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
//            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
//            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
//            insets
//        }
    }
    fun stringToRequestBody(value: String): RequestBody {
        return RequestBody.create("text/plain".toMediaTypeOrNull(), value)
    }

    fun byteArrayToMultipartFile(byteArray: ByteArray, fileName: String): MultipartBody.Part {
        // Create RequestBody instance from byte array
        val requestBody = RequestBody.create("application/octet-stream".toMediaTypeOrNull(), byteArray)

        // MultipartBody.Part is used to send also the actual file name
        return MultipartBody.Part.createFormData("file", fileName, requestBody)
    }
}