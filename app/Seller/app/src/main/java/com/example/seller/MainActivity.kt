package com.example.seller
import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.widget.Button
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.OkHttpClient
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.ResponseBody
import okhttp3.logging.HttpLoggingInterceptor
import org.opencv.android.OpenCVLoader
import org.opencv.android.Utils
import org.opencv.core.Core
import org.opencv.core.CvType
import org.opencv.core.Mat
import org.opencv.core.MatOfDouble
import org.opencv.imgproc.Imgproc
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.ByteArrayOutputStream
import java.io.File

class MainActivity : AppCompatActivity() {
    private lateinit var imageUri: Uri
    private val REQUEST_GALLERY = 2

    private val contract = registerForActivityResult(ActivityResultContracts.GetContent()) {
        imageUri =  it!!

    }

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        val toolbar: androidx.appcompat.widget.Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.title = "Sellers"
        if (OpenCVLoader.initDebug()) {
            Toast.makeText(this, "OpenCV initialization success", Toast.LENGTH_SHORT).show()
        } else {
            Toast.makeText(this, "OpenCV initialization failed", Toast.LENGTH_SHORT).show()
        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), 1)
        }

        val captureImageLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == RESULT_OK) {
                val photo = result.data?.extras?.get("data") as Bitmap
                checkImageQuality_capture(photo)
            }
        }



        findViewById<Button>(R.id.captureButton).setOnClickListener {
            val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            captureImageLauncher.launch(intent)
        }
        findViewById<Button>(R.id.selectButton).setOnClickListener {
            val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)

            startActivityForResult(intent, REQUEST_GALLERY)


        }
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_GALLERY && resultCode == Activity.RESULT_OK && data != null) {
            imageUri= data.data!!
            if (imageUri != null) {
                val bitmap = MediaStore.Images.Media.getBitmap(this.contentResolver, imageUri)
                checkImageQuality_gallery(bitmap)

            }
        }
    }

    private fun checkImageQuality_gallery(bitmap: Bitmap) {
        val mat = Mat(bitmap.height, bitmap.width, CvType.CV_8UC3)
        Utils.bitmapToMat(bitmap, mat)

        // Check lighting
        val gray = Mat()
        Imgproc.cvtColor(mat, gray, Imgproc.COLOR_BGR2GRAY)
        val mean = Core.mean(gray).`val`[0]
        if (mean < 50) {
            Toast.makeText(this, "Image too dark", Toast.LENGTH_SHORT).show()

            return
        } else if (mean > 200) {
            Toast.makeText(this, "Image too bright", Toast.LENGTH_SHORT).show()
            return
        }

        // Check blur
        val laplacian = Mat()
        Imgproc.Laplacian(gray, laplacian, CvType.CV_64F)
        val meanMat = MatOfDouble()
        val stdDevMat = MatOfDouble()
        Core.meanStdDev(laplacian, meanMat, stdDevMat)
        val stdDev = stdDevMat.get(0, 0)[0]
        val variance = stdDev * stdDev
        //Toast.makeText(this,"${variance}",Toast.LENGTH_SHORT).show()
        if (variance<100) {
            Toast.makeText(this, "Image too blurry", Toast.LENGTH_SHORT).show()

            return
        }
        upload()
        Toast.makeText(this, "Image quality is good", Toast.LENGTH_SHORT).show()
//        val intent = Intent(this, ResultActivity::class.java)
//        val stream = ByteArrayOutputStream()
//        bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
//        val byteArray = stream.toByteArray()
//        intent.putExtra("image", byteArray)
//
//        startActivity(intent)
    }

    private fun checkImageQuality_capture(bitmap: Bitmap) {
        val mat = Mat(bitmap.height, bitmap.width, CvType.CV_8UC3)
        Utils.bitmapToMat(bitmap, mat)

        // Check lighting
        val gray = Mat()
        Imgproc.cvtColor(mat, gray, Imgproc.COLOR_BGR2GRAY)
        val mean = Core.mean(gray).`val`[0]
        if (mean < 50) {
            Toast.makeText(this, "Image too dark", Toast.LENGTH_SHORT).show()
            return
        } else if (mean > 200) {
            Toast.makeText(this, "Image too bright", Toast.LENGTH_SHORT).show()
            return
        }

        // Check blur
        val laplacian = Mat()
        Imgproc.Laplacian(gray, laplacian, CvType.CV_64F)
        val meanMat = MatOfDouble()
        val stdDevMat = MatOfDouble()
        Core.meanStdDev(laplacian, meanMat, stdDevMat)
        val stdDev = stdDevMat.get(0, 0)[0]
        val variance = stdDev * stdDev
        //Toast.makeText(this,"${variance}",Toast.LENGTH_SHORT).show()
        if (variance < 500) {
            Toast.makeText(this, "Image too blurry", Toast.LENGTH_SHORT).show()
            return
        }

        Toast.makeText(this, "Image quality is good", Toast.LENGTH_SHORT).show()

        val intent = Intent(this, ResultActivity::class.java)
        val stream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
        val byteArray = stream.toByteArray()
        intent.putExtra("image", byteArray)
        startActivity(intent)
    }

    private fun upload() {
        //Toast.makeText(this, "Uploading image...", Toast.LENGTH_SHORT).show()
        val filesDir = applicationContext.filesDir
        val file = File(filesDir, "image.png")

        val inputStream = contentResolver.openInputStream(imageUri)
        val outputStream = file.outputStream()
        inputStream!!.copyTo(outputStream)

        val requestBody = file.asRequestBody("image/*".toMediaTypeOrNull())
        val part = MultipartBody.Part.createFormData("file",file.name,requestBody)

        val httpClient = OkHttpClient.Builder()
        httpClient.addInterceptor(HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        })


        val call = ApiClient.apiService.uploadFile(part)

        call.enqueue(object : Callback<ResponseBody> {
            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                if (response.isSuccessful) {
                    //val response = response.body()
                    Toast.makeText(this@MainActivity,"Image Uploaded",Toast.LENGTH_SHORT).show()

                    // Handle the retrieved post data
                } else {
                    // Handle error
                }
            }

            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                // Handle failure
            }
        })

//        retrofit.uploadFile(part)

//        MainActivity.getServerRequests().updateUserPhoto(fileToUpload)
//            .enqueue(object : Callback<String?>() {
//                fun onResponse(call: Call<String?>?, response: Response<String?>) {
//                    if (response.body() != null) {
//                        System.err.println(response.body())
//                    } else {
//                        System.err.println("RESPONSE BODY NULL")
//                    }
//                }
//
//                fun onFailure(call: Call<String?>?, t: Throwable) {
//                    System.err.println("UPDATE PHOTO FAIL " + t.message)
//                }
//            })

    }


}

object RetrofitClient {
    private const val BASE_URL = "https://ccc1-167-103-2-92.ngrok-free.app"

    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}

object ApiClient {
    val apiService: ApiService by lazy {
        RetrofitClient.retrofit.create(ApiService::class.java)
    }
}