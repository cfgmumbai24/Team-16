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
import android.widget.Toolbar
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import org.opencv.android.OpenCVLoader
import org.opencv.android.Utils
import org.opencv.core.Core
import org.opencv.core.CvType
import org.opencv.core.Mat
import org.opencv.core.MatOfDouble
import org.opencv.imgproc.Imgproc
import java.io.ByteArrayOutputStream

class MainActivity : AppCompatActivity() {
    private val REQUEST_GALLERY = 2
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
            val selectedImage: Uri? = data.data
            if (selectedImage != null) {
                val bitmap = MediaStore.Images.Media.getBitmap(this.contentResolver, selectedImage)
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
        Toast.makeText(this,"${variance}",Toast.LENGTH_SHORT).show()
        if (variance<300) {
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
        Toast.makeText(this,"${variance}",Toast.LENGTH_SHORT).show()
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
}