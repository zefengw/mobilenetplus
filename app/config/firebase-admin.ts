import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = {
  projectId: "mobilenetplus",
  clientEmail: "firebase-adminsdk-8nb51@mobilenetplus.iam.gserviceaccount.com",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLXm7/6/B5X9B7\nWuMDDpzXKgez22IN/0+EZxgX6E6lfr/gmclJcDnLlMFn/HRoKmv0Ddoy3BM0OKrt\nFFZFNPmTqW3YugM+p+x9IAxXg+blxe1AmrGDM25G8QMxVHpMpQvIBwlASFUqj54y\nAqAlcjtDlChDC8ViNZzBk9H5eb0FwBNVxxyuTRPce8WZvV2tICl1tvKZeOYyv/T7\n9XOm9v6+HCTxm/WeBBr+Dzc3tF7yxWHHIHhX42TvoL3FfY6ycQ2W/nO5yc6OmgQq\nr+ibYt9MqO6fxDe6CEIy28aUWaC8i4EQqMKWv+5Oex0yAEIisNp8VAw4QPlz+oDX\ncPnoGK/HAgMBAAECggEAAalzHmckW3YqiMYJLfinIyOzqs/jZ/JS8uu9zE8vXObZ\nh+adkVwevFA+TCylALb8yZC+uNuJ+RXx59jVvIaIsVuUXUC+mCktd0KCEysV/khx\nb1NI6Z0b5AmstZJh0Pco4E5BLHyQU20aAFOqsDegAErMfhwuUuD7yQ0ntFdgyyg+\nMS6rOieuZm+3izDzo+5dQGRAzm0/ubjrV/Ohz+aqWsRq3ytZl/pQMyhTKmeMgPID\nCCGZkSgW9P3ose/urGsCydleXAtax9/DlqWpx8z+jFF32zrz/Ei0JZTyYkxNdIfI\ny4xJpL4NZOtSUyaLk4VeTJD4u9fCcFjVoxufHFe9YQKBgQDBn8JkSXfeFJTcUEkU\n84h1B8W+kMWuGvZ4N0L8USNHy3WnlGIYIVGO0CFf4IpVJLNqa5Bt1WRYcoftVLuk\nK4pxGl/eeIC+sl6MMh2hJQwJdeO5TEX8htJ9eyzgXjjFs0W771uhd1Zni7fjSvF9\nwq0LaSDN/EmBOAhkNUCK3F62JwKBgQC4RDtKjNO3yiga8dRRm54yTF08+74knJJE\n9YOJV072hPzCni1Ux+gMRVe0tMfLuzrBwJOUVbsfIj0dJLfjiHpxnsyz6WzTLxga\nUEdzslv2VI3KeLw8bsRJSrvZhQNKd2xROS/plr/MN08FVfwFYIY+JPbe+H0HL5J3\nECty0xrdYQKBgBpY+QTYkn0f49nO+wLk2M7EDf6OiLfWZ2+YZX8cM2bTouD46hhK\ngGSkocYAMhK/+cIjfPXVMeBvRVvgSeBfJGmboywMzcglUYRWVX3WIrsu1Zwjauqg\nFgiJOGQXrjYI3RZjzd489P8GHjHJwu7QDOgemB4vlHkG/O1V6cB7mE/FAoGALy6h\nc/RdXekwnb2gXQkY184/7ZaUWHGS7n9jH+6wNGVXB0pTVysc2s+Cpq3Hnv4hDG2Q\nHGJbWJx+w5CcWXGf0KoVxleV2vlrFYnK0fAwpgF+kQKbSGogbpfpQ8hQUGgF30Ji\nZ1CHafYbkMU0k/fkR9NVN0CvWwCuYzhLt8ogTeECgYEAosVUTzie+jEN/8f7/Ya1\nIdJev/6KFViDt88FNiYFflcj+m53jr4UtrJ+QXr/1j/eyGVcczWNwqJG21Ah9Pvn\n+VcwM5ZlLxRIqjDJuNxmeW40YeF0dfvHILHwfPeKQZXTfbc1uUg8NO/bB9WQh9MF\nfqDGw5yXV7RxZsJIR6aYLso=\n-----END PRIVATE KEY-----\n"
}

const firebaseAdminConfig = {
  credential: cert(serviceAccount),
  projectId: serviceAccount.projectId,
}

// Initialize Firebase Admin
const app = !getApps().length ? initializeApp(firebaseAdminConfig) : getApps()[0]
const adminDb = getFirestore(app)

export { adminDb } 