<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CmsController extends AbstractController
{
    /**
     * @Route("/cms", name="cms")
     */
    public function index(): Response
    {
        return $this->render('cms/index.html.twig');
    }
}
