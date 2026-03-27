interface AIDisclaimerTextProps {
  emphasizeVerification?: boolean;
}

export function AIDisclaimerText({ emphasizeVerification = false }: AIDisclaimerTextProps) {
  return (
    <>
      Resumen generado por IA.{" "}
      {emphasizeVerification ? (
        <span className="font-bold underline">
          Verifica las fuentes antes de compartir.
        </span>
      ) : (
        "Verifica las fuentes antes de compartir."
      )}
    </>
  );
}