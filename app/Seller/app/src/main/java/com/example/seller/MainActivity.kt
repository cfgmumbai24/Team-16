package com.example.seller
import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
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
import org.opencv.android.OpenCVLoader
import org.opencv.android.Utils
import org.opencv.core.Core
import org.opencv.core.CvType
import org.opencv.core.Mat
import org.opencv.imgproc.Imgproc
import java.io.ByteArrayOutputStream

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
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
                checkImageQuality(photo)
            }
        }

        findViewById<Button>(R.id.captureButton).setOnClickListener {
            val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            captureImageLauncher.launch(intent)
        }
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }
    private fun checkImageQuality(bitmap: Bitmap) {
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
        val variance = Core.mean(laplacian).`val`[0]
        Toast.makeText(this,"${variance}",Toast.LENGTH_SHORT).show()
        if (variance >0) {
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