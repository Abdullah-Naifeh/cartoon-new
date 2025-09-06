// 'use client';

// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { signIn, useSession } from 'next-auth/react';
// import Image from 'next/image';
// import CustomToast from '../../components/CustomToast';
// import { useEffect } from 'react';
// import { TbDoorEnter } from 'react-icons/tb';

// export default function LogInPage() {
//   const session = useSession();
//   // console.log(session?.data?.user?.name);
//   const router = useRouter();
//   const schema = z.object({
//     email: z.string().email(),
//     password: z.string().min(),
//   });

//   const {
//     register,
//     getValues,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(schema) });

//   useEffect(() => {
//     if (session?.data?.user?.email) {
//       // تحديد الصفحة المطلوبة بعد تسجيل الدخول
//       const callbackUrl = router.query?.callbackUrl || '/home';
//       router.push(callbackUrl);
//     }
//   }, [router, session?.data?.user?.email]);

//   async function onSubmit() {
//     if (getValues()?.email === '') {
//       setError('email', {
//         type: 'custom',
//         message: 'عنوان البريد الإلكتروني مطلوب',
//       });
//       return;
//     } else if (getValues()?.password?.length < 5) {
//       setError('password', {
//         type: 'custom',
//         message:
//           'طول كلمة السر يجب أن يكون 5 أحرف (أو 5 أرقام وأحرف) على الأقل',
//       });
//       return;
//     }
//     // console.log('getValues', getValues());

//     const response = await signIn('credentials', {
//       ...getValues(),
//       redirect: false,
//       callbackUrl: '/home',
//       popup: true,
//     });

//     if (response.ok) {
//       const values = getValues();

//       localStorage.setItem('email', values?.email);
//       // localStorage.setItem('password', values?.password);
//       router.push('/home');
//       toast.custom((t) => (
//         <CustomToast
//           t={t}
//           message={' بهيجة اشرق لبن ترحب بكم أهلا وسهلا '}
//           emoji={'🧀'}
//           greenEmoji={'🧀'}
//         />
//       ));
//     } else {
//       setError(response?.error);
//       toast.custom((t) => (
//         <CustomToast
//           t={t}
//           message={
//             'عنوان البريد الالكتروني هذا غير موجود يجب عليك التسجيل أولا 😐'
//           }
//         />
//       ));
//     }
//   }

//   function handleGoogleSignIn() {
//     // تعيين العرض والارتفاع الافتراضي
//     let popupWidth = 300;
//     const popupHeight = 700;

//     // إذا كانت الشاشة متوسطة أو كبيرة (أكبر من 768px)، قم بزيادة العرض إلى 500
//     if (window.screen.width >= 768) {
//       popupWidth = 500;
//     }

//     // حساب الموضع لجعل النافذة في وسط الشاشة
//     const left = window.screen.width / 2 - popupWidth / 2;
//     const top = window.screen.height / 2 - popupHeight / 2;

//     // خيارات النافذة المنبثقة
//     const options = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`;

//     // فتح النافذة المنبثقة
//     const popup = window.open('/api/auth/signin', 'GoogleLoginPopup', options);

//     if (!popup) {
//       console.error('تعذر فتح النافذة المنبثقة.');
//       return;
//     }

//     // مراقبة النافذة المنبثقة
//     const checkPopup = setInterval(() => {
//       if (popup.closed) {
//         clearInterval(checkPopup);
//         fetch('/api/auth/session')
//           .then((res) => res.json())
//           .then((session) => {
//             if (session?.user) {
//               // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول
//               router.push('/home');
//               toast.custom((t) => (
//                 <CustomToast
//                   t={t}
//                   message={'بهيجة أشرق لبن ترحب بكم'}
//                   greenEmoji={'✔'}
//                 />
//               ));
//             } else {
//               console.error('لم يتم تسجيل الدخول.');
//             }
//           })
//           .catch((error) =>
//             console.error('حدث خطأ أثناء التحقق من الجلسة:', error)
//           );
//       }
//     }, 1000);
//   }

//   return (
//     <div className="absolute top-20 right-0 p-4 bg-gradient-to-br from-orange-100/10 via-orange-400 to-orange-100/10 flex justify-center items-center w-full h-screen text-white text-lg md:text-xl text-end">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full lg:w-1/2 bg-four p-8 rounded-lg border bg-white/20"
//       >
//         <h1 className="flex justify-center gap-4 mb-16 w-full my-2 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-center select-none text-nowrap">
//           تسجيل الدخول
//           <TbDoorEnter className="text-3xl" />
//         </h1>

//         <div className="relative flex justify-center h-44 w-full text-center">
//           <Image
//             loading="lazy"
//             src={'/images/bahiga.png'}
//             layout="fill"
//             objectFit="contain"
//             alt="photo"
//           />
//         </div>

//         <div
//           className="flex justify-center w-full bg-white rounded-md px-4 py-2 gap-2 items-center my-8 hover:shadow-md cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
//           onClick={handleGoogleSignIn}
//         >
//           <h1 className="text-sm sm:text-lg grow text-center text-gray-500 select-none font-semibold">
//             تسجيل الدخول عن طريق جوجل
//           </h1>
//           <div className="relative h-8 w-8 ">
//             <Image
//               loading="lazy"
//               src={'/images/google.png'}
//               alt="google image"
//               layout="fill"
//               objectFit="contain"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import CustomToast from '../../components/CustomToast';
import { useEffect, useState } from 'react';
import {
  TbDoorEnter,
  TbEye,
  TbEyeOff,
  TbBrandGoogle,
  TbMail,
  TbLock,
} from 'react-icons/tb';

export default function LogInPage() {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    email: z.string().email({ message: 'البريد الإلكتروني غير صحيح' }),
    password: z
      .string()
      .min(5, { message: 'كلمة المرور يجب أن تكون 5 أحرف على الأقل' }),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (session?.data?.user?.email) {
      const callbackUrl = searchParams?.get('callbackUrl') || '/home';
      router.push(callbackUrl);
    }
  }, [router, session?.data?.user?.email, searchParams]);

  async function onSubmit(data) {
    setIsLoading(true);

    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.ok) {
      localStorage.setItem('email', data.email);
      const callbackUrl = searchParams?.get('callbackUrl') || '/home';
      router.push(callbackUrl);
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={'بهيجة اشرق لبن ترحب بكم أهلاً وسهلاً'}
          emoji={'🧀'}
          greenEmoji={'🧀'}
        />
      ));
    } else {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={'البريد الإلكتروني أو كلمة المرور غير صحيحة'}
        />
      ));
    }
    setIsLoading(false);
  }

  function handleGoogleSignIn() {
    let popupWidth = 300;
    const popupHeight = 700;

    if (window.screen.width >= 768) {
      popupWidth = 500;
    }

    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;

    const options = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`;

    const popup = window.open('/api/auth/signin', 'GoogleLoginPopup', options);

    if (!popup) {
      toast.error(
        'تعذر فتح النافذة المنبثقة. يرجى السماح بالنوافذ المنبثقة لهذا الموقع.'
      );
      return;
    }

    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
        fetch('/api/auth/session')
          .then((res) => res.json())
          .then((session) => {
            if (session?.user) {
              router.push('/home');
              toast.custom((t) => (
                <CustomToast
                  t={t}
                  message={'بهيجة اشرق لبن ترحب بكم'}
                  greenEmoji={'✔'}
                />
              ));
            }
          })
          .catch((error) => {
            console.error('حدث خطأ أثناء التحقق من الجلسة:', error);
          });
      }
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-100 via-orange-200 to-amber-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-orange-200 transform transition-all duration-300 hover:shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400"></div>

        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 mb-4 transform transition-all duration-500 hover:scale-105">
              <Image
                src={'/images/bahiga.png'}
                fill
                className="object-contain"
                alt="Bahiga Eshraq Laban"
                priority
              />
            </div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-orange-800">
              تسجيل الدخول
              <TbDoorEnter className="text-4xl text-orange-600 animate-bounce delay-1000" />
            </h1>
            <p className="mt-2 text-orange-600">أهلاً بك مرة أخرى!</p>
          </div>

          {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <TbMail className="text-orange-500 text-xl" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full pr-10 pl-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none transition-all duration-300 ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-200'
                      : 'border-orange-200 focus:ring-orange-200 focus:border-orange-400'
                  }`}
                  placeholder="البريد الإلكتروني"
                  dir="ltr"
                />
              </div>
              {errors.email && (
                <p className="text-rose-600 text-sm flex items-center gap-1 animate-shake">
                  <span>⚠</span> {errors.email.message}
                </p>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <TbLock className="text-orange-500 text-xl" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full pr-10 pl-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none transition-all duration-300 ${
                    errors.password
                      ? 'border-rose-500 focus:ring-rose-200'
                      : 'border-orange-200 focus:ring-orange-200 focus:border-orange-400'
                  }`}
                  placeholder="كلمة المرور"
                  dir="ltr"
                />
                <button
                  type="button"
                  className="absolute left-0 inset-y-0 flex items-center pl-3 text-orange-500 hover:text-orange-700 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <TbEyeOff /> : <TbEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-600 text-sm flex items-center gap-1 animate-shake">
                  <span>⚠</span> {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2
                ${
                  isLoading
                    ? 'bg-orange-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  جاري تسجيل الدخول...
                </>
              ) : (
                <>
                  <TbDoorEnter className="text-xl" />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form> */}
          {/* 
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-orange-600">أو</span>
            </div>
          </div> */}

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-orange-200 text-orange-700 py-3 px-4 rounded-lg font-medium hover:bg-orange-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <TbBrandGoogle className="text-xl text-rose-500" />
            تسجيل الدخول باستخدام جوجل
          </button>
        </div>

        {/* <div className="px-8 py-4 bg-orange-50/50 border-t border-orange-100 text-center">
          <p className="text-orange-700 text-sm">
            ليس لديك حساب؟{' '}
            <button
              className="text-orange-600 font-semibold hover:text-orange-800 underline transition-colors"
              onClick={() => router.push('/signup')}
            >
              إنشاء حساب جديد
            </button>
          </p>
        </div> */}
      </div>
    </div>
  );
}
