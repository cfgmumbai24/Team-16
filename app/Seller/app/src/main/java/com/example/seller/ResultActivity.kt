package com.example.seller

import android.graphics.BitmapFactory
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Spinner
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ResultActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_result)
        val imageView: ImageView = findViewById(R.id.capturedImageView)
        val categorySpinner: Spinner = findViewById(R.id.categorySpinner)
        val button : Button = findViewById(R.id.submitButton)

        val byteArray = intent.getByteArrayExtra("image")
        if (byteArray != null) {
            val bitmap = BitmapFactory.decodeByteArray(byteArray, 0, byteArray.size)
            imageView.setImageBitmap(bitmap)
        }

        // Set up the spinner
        val categories = arrayOf("Terracotta", "Banana Fibre", "Macrame Based", "Jute Bags", "Moonj")
        val adapter = ArrayAdapter(this, R.layout.spinner_item, categories)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item) // You can create another layout for dropdown items if needed
        categorySpinner.adapter = adapter

        val requestFile = RequestBody.create("image/jpeg".toMediaTypeOrNull(), byteArray!!)
        val body = MultipartBody.Part.createFormData("image", "image.jpg", requestFile)

//        val retrofit = RetrofitClient.instance
//        val apiService = retrofit.create(ApiService::class.java)
        val editName:EditText = findViewById(R.id.editTextLatitude)
        val name = editName.text.toString().trim()
        Toast.makeText(this,"${editName.text.toString().trim()}",Toast.LENGTH_SHORT).show()
        button.setOnClickListener {
//            val call = apiService.uploadImage(body)
//            call.enqueue(object : Callback<ResponseBody> {
//                override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
//                    if (response.isSuccessful) {
//                        Toast.makeText(this@ResultActivity, "Upload successful!", Toast.LENGTH_SHORT).show()
//                    } else {
//                        Toast.makeText(this@ResultActivity, "Upload failed!", Toast.LENGTH_SHORT).show()
//                    }
//                }
//
//                override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
//                    Toast.makeText(this@ResultActivity, "Upload error: ${t.message}", Toast.LENGTH_SHORT).show()
//                }
//            })
            Toast.makeText(this, "Image Successfully Submitted", Toast.LENGTH_SHORT).show()
            finish()
        }
//        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
//            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
//            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
//            insets
//        }
    }
}