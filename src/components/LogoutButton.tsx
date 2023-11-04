import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { account } from "../config/appwriteConfig";
import { userStore } from "../state/userStore";
import { Models, AppwriteException } from "appwrite";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function LogoutButton() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userSession = userStore((state) => state.userSession) as Models.Session;
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    if (userSession.$id) {
      setLoading(true);
      return account
        .deleteSession(userSession.$id)
        .then((response: unknown) => {
          setLoading(false);
          navigate("/login");
          toast.success("Logout Successfully");
          onOpen();
        })
        .catch((error: AppwriteException) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Something went Wrong");
    }
  };
  return (
    <React.Fragment>
      <Button color="danger" onPress={onOpen}>
        Logout
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <React.Fragment>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                <h6 className="text-lg font-medium">
                  Are you Sure you want to logout ?
                </h6>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={handleLogout}
                  isDisabled={loading}
                  isLoading={loading}
                >
                  Logout
                </Button>
              </ModalFooter>
            </React.Fragment>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}
