# LibraryApp

LibraryApp, bir kütüphane uygulamasıdır. React Native, TypeScript, Expo ve Redux Toolkit (RTK) Query gibi teknolojiler kullanılarak geliştirilmiştir. Bu uygulama, kitapları yönetmenize, arama yapmanıza ve kitap detaylarını görüntülemenize olanak tanır.

## Özellikler

- **Kitap Yönetimi:** Kitap ekleme, düzenleme ve silme işlemleri.
- **Arama ve Filtreleme:** Kitap adı, ISBN numarası ve yazar adı ile arama yapabilme.
- **Kitap Listesi ve Detay Görüntüleme:** Kitapları liste halinde görüntüleme ve her bir kitabın detay bilgilerine erişim.
- **Kullanıcı Giriş ve Yetkilendirme:** Standart kullanıcılar ve yöneticiler için yetkilendirme mekanizması.

## Teknolojiler

- **React Native**
- **TypeScript**
- **Expo**
- **Redux Toolkit (RTK) Query**
- **Supabase**

## Kurulum

Projenizi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### 1. Depoyu Klonlayın

git clone https://github.com/erkanyetisgin/LibraryApp.git
cd LibraryApp

### 2. Gerekli Paketleri Yükleyin

Proje dizinine girdikten sonra, uygulamanın bağımlılıklarını yüklemek için npm install komutunu çalıştırın.
Bu komut, package.json dosyasında belirtilen tüm bağımlılıkları indirir ve projenizin çalışması için gerekli olan modülleri kurar.

### 3. Çevre Değişkenlerini Ayarlayın

Projenin düzgün bir şekilde çalışabilmesi için Supabase bağlantı bilgilerinin ayarlanması gerekmektedir. Bu bilgiler .env dosyasına eklenmelidir. Örnek bir yapılandırma aşağıda verilmiştir:

.env dosyasına ekleyin:

export const supabaseUrl = 'https://your-supabase-url';
export const supabaseAnonKey = 'your-supabase-anon-key';
export const baseUrl = 'https://your-supabase-url/rest/v1/';

Bu dosya .gitignore içinde yer almalıdır, böylece bu bilgiler güvende kalır.

### 4. Uygulamayı Başlatın

Uygulamayı başlatmak için, proje dizininde aşağıdaki komutu çalıştırın:

bash
Kodu kopyala
npx expo start

Bu komut, Expo geliştirici aracını başlatarak uygulamanızı bir simülatörde veya fiziksel bir cihazda test etmenizi sağlar.
