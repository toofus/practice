<?php

namespace App\DataTransferObject;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

class DemoDTO
{
	/**
	 * @Assert\NotBlank
	 * @Assert\Length(min = 50)
	 */
	public $name;

	/**
	 * @Assert\NotBlank
	 * @Assert\Length(min = 50)
	 */
	public $phone;

	/**
	 * @Assert\NotBlank
	 * @Assert\Image(
	 *  mimeTypes = "image/jpeg",
     *  maxSize = "1M"
	 * )
	 */
	public $upload;

	public function __construct($name, $phone, UploadedFile $upload = null)
	{
		$this->name = $name;
		$this->phone = $phone;
		$this->upload = $upload;
	}
}
