import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import conf from "../../conf/conf";
import { ID, AppwriteException } from "appwrite";
import { databases } from "../../config/appwriteConfig";
import toast from "react-hot-toast";
import { communityStore } from "../../state/communityStore";

interface CommunityForm {
  name: string;
  description: string;
}

export default function CreateCommunity() {
  const communityState = communityStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CommunityForm>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleCreate = async (data: CommunityForm) => {
    console.log("data", data);
    return databases
      .createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          Name: data.name,
          Description: data.description,
        }
      )
      .then((response) => {
        console.log("response of create Community", response);
        communityState.addCommunity(response);
        toast.success("Community Created");
      })
      .catch((error: AppwriteException) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Create Community
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => reset()}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Community
              </ModalHeader>
              <form onSubmit={handleSubmit(handleCreate)}>
                <ModalBody>
                  <div>
                    <div className="grid grid-cols gap-4">
                      <div>
                        <Controller
                          name="name"
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              variant={"flat"}
                              label="Name"
                            />
                          )}
                        />
                      </div>
                      <div>
                        <Controller
                          name="description"
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              variant={"flat"}
                              label="Description"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
