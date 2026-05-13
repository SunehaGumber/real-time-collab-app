export const errorMiddleware=async (err,req,res,next) => {
    return res.status(500 || err.statusCode).json({
        success:false,
        message:err.message || 'Internal Server error'
    })
}