import { requireAuth } from "@/lib/auth-utils";

interface CredentialPageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

const CredentialPage = async ({ params }: CredentialPageProps) => {
  await requireAuth();

  const { credentialId } = await params;
  return <div>Credential Id: {credentialId}</div>;
};

export default CredentialPage;
