<?php

namespace App\Controller;

use App\DataTransferObject\DemoDTO;
use App\Repository\DemoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class DashboardController extends AbstractController
{
    /**
     * @Route("/dashboard/{spaRoute}", name="app_dashboard", requirements={"spaRoute" = ".+"}, defaults={"spaRoute" = null}, methods={"GET"})
     */
    public function show(): Response
    {
        return $this->render('dashboard.html.twig');
    }

    /**
     * @Route("/get-profile", methods={"GET", "POST"})
     */
    public function profile(Request $request): Response
    {
    	return $this->json([
            'identifier' => $this->getUser()->getIdentifier(),
            'current_password' => '',
            'new_password' => '',
            'confirm_password' => ''
        ]);
    }

    /**
     * @Route("/get-data", methods={"GET"})
     */
    public function getData(DemoRepository $repo): Response
    {
        $demo = $repo->find(1);
        $fields = $demo->getFields();
        return $this->json(['success' => true, 'data' => $demo->getFields()]);
    }

    /**
     * @Route("/post-data", methods={"POST"})
     */
    public function postData(Request $request, ValidatorInterface $validator, DemoRepository $repo): Response
    {
        $data = [];
        $errors = [];
        // dd($request->get('form'));
        $rows = $request->get('form');
        if (empty($rows)) {
            $data = [];
        } else {
            foreach($rows as $index => $form) {
                $obj = new DemoDTO(
                    $form['id'],
                    $form['name'],
                    $form['phone'],
                    $form['media'],
                    $request->files->get('form')[$index]['upload'] ?? null
                );
                $violations = $validator->validate($obj);
                if (count($violations) > 0) {
                    $messages = [];
                    foreach($violations as $violation) {
                        $messages[] = ['propertyPath' => $violation->getPropertyPath(), 'message' => $violation->getMessage()];
                    }
                    $errors[$index] = $messages;
                } else {
                    $data[$obj->id] = $obj->jsonSerialize();
                }
            }
            if (count($errors) > 0) {
                return $this->json(['success' => false, 'data' => ['violations' => $errors]]);
            }
        }
        $demo = $repo->find(1);
        $demo->setFields($data);
        $this->getDoctrine()->getManager()->flush();
        return $this->json(['success' => true]);
    }
}
