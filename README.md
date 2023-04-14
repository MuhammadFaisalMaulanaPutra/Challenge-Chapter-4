# BCR - Car Management Dashboard

BCR - Car Management Dashboard ini dipergunakan untuk Admin menambahkan, mengubah, menghapus data mobil dari Database. Disini terdapat beberapa fungsi untuk mengelola Database. Diantaranya ada :

1. Create Data
2. Update Data
3. Delete Data

## ERD - Car Table

![dbdiagram](/public/assets/img/db.png)

Di dalam Car Table terdapat 6 atribut, yaitu:

- **_name (varchar)_** digunakan untuk menyimpan informasi nama/tipe mobil
- **_costPerDay (integer)_** digunakan untuk menyimpan informasi harga sewa/hari
- **_size (varchar)_** digunakan untuk menyimpan informasi ukuran mobil(Kecil, Sedang, Besar)
- **_img (text)_** digunakan untuk menyimpan informasi URL gambar mobil
- **_createdAt (timestamp)_** digunakan untuk menyimpan informasi kapan data tersebut dibuat
- **_updatedAt (timestamp)_** digunakan untuk menyimpan informasi kapan terakhir kali data tersebut diubah

## Featured

### Create Data

Create data digunakan untuk menambahkan data baru kedalam Database. Didalam Create data diperlukan informasi data mobil yang lengkap untuk memasukannya kedalam Database.

### Update Data

Update data digunakan untuk mengubah data yang telah ada didalam Database. Didalam Update data diperlukan sebuah id dari data yang ingin diubah agar mencegah terjadinya salah pengubahan data.

### Delete Data

Delete data digunakan untuk menghapus data yang ada didalam Database.
