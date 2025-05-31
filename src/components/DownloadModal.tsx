import Modal from "@/components/Modal";

// モーダルのプロップス型定義
interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: string;
  title: string;
  children: React.ReactNode;
}

export default function DownloadModal({
  isOpen,
  onClose,
  title,
  children,
  image,
}: DownloadModalProps) {
  const displayImage = image || "/001_top/Moviedummy.png";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      imageUrl={displayImage}
      variant="download"
      maxWidth="900px"
    >
      {children}
    </Modal>
  );
}
