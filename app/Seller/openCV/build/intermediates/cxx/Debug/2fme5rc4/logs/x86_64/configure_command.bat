@echo off
"D:\\Android\\SDK\\cmake\\3.22.1\\bin\\cmake.exe" ^
  "-HD:\\team16\\Team-16\\app\\Seller\\openCV\\libcxx_helper" ^
  "-DCMAKE_SYSTEM_NAME=Android" ^
  "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON" ^
  "-DCMAKE_SYSTEM_VERSION=21" ^
  "-DANDROID_PLATFORM=android-21" ^
  "-DANDROID_ABI=x86_64" ^
  "-DCMAKE_ANDROID_ARCH_ABI=x86_64" ^
  "-DANDROID_NDK=D:\\Android\\SDK\\ndk\\26.1.10909125" ^
  "-DCMAKE_ANDROID_NDK=D:\\Android\\SDK\\ndk\\26.1.10909125" ^
  "-DCMAKE_TOOLCHAIN_FILE=D:\\Android\\SDK\\ndk\\26.1.10909125\\build\\cmake\\android.toolchain.cmake" ^
  "-DCMAKE_MAKE_PROGRAM=D:\\Android\\SDK\\cmake\\3.22.1\\bin\\ninja.exe" ^
  "-DCMAKE_LIBRARY_OUTPUT_DIRECTORY=D:\\team16\\Team-16\\app\\Seller\\openCV\\build\\intermediates\\cxx\\Debug\\2fme5rc4\\obj\\x86_64" ^
  "-DCMAKE_RUNTIME_OUTPUT_DIRECTORY=D:\\team16\\Team-16\\app\\Seller\\openCV\\build\\intermediates\\cxx\\Debug\\2fme5rc4\\obj\\x86_64" ^
  "-DCMAKE_BUILD_TYPE=Debug" ^
  "-BD:\\team16\\Team-16\\app\\Seller\\openCV\\.cxx\\Debug\\2fme5rc4\\x86_64" ^
  -GNinja ^
  "-DANDROID_STL=c++_shared"
