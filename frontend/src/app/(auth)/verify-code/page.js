import VerifyCode from "@/components/auth/VerifyCode";

const VerifyCodePage = () => {
  return (
    <section className="py-16">
      <div className="max-w-sm mx-auto border p-6 rounded">
        <div className="mb-6">
          We’ve sent a verification <strong>code</strong> to your{" "}
          <strong>inbox</strong> to complete your registration. If you don’t
          find it there, please check your <strong>spam</strong> or{" "}
          <strong>junk</strong> folder.
        </div>
        <VerifyCode />
      </div>
    </section>
  );
};

export default VerifyCodePage;
