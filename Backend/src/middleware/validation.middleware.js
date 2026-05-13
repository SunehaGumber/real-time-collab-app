export const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse({
      body: req.body,
     
    });
    req.body = validatedData.body;
    next();
  } catch (err) {
      console.log(err);
      return res.status(400).json({
      status: "fail",
      errors: err?.errors?.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }
};
