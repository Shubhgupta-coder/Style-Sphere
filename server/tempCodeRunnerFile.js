app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders: [   
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
    //   Help us in login and register
      credentials: true,
}));

app.use(cookieParser());
app.use(express.json());